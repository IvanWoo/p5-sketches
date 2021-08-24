import type p5 from "p5";

import { range } from "@thi.ng/iterators";
import { weightedRandom } from "@thi.ng/random";

import { colorhunt } from "./utils/color";

`
- layout
- color palette
- pattern
  - a triangle
  - a circle
  - a rect
  - tile circles
  - tile rects
`;
const colorPalette = colorhunt[10];

// https://openprocessing.org/sketch/1233942
export const sketch = (p: p5) => {
    const colorPalette = [
        "#f70640",
        "#f78e2c",
        "#fdd903",
        "#cae509",
        "#63be93",
        "#81cfe5",
        "#299dbf",
        "#38187d",
        "#a4459f",
        "#f654a9",
        "#2F0A30",
    ];
    const rows = 11;
    const unitH = 50;
    const marginX = 50;
    const marginY = 30;
    const width = 1000;
    const height = rows * unitH + 2 * marginY;

    const drawTriangle = (x: number, y: number, w: number, h: number) => {
        const centerX = x + w / 2;
        const centerY = y + h / 2;
        const c = p.int(p.random(4));
        p.beginShape();
        if (c !== 0) p.vertex(centerX - w / 2, centerY - h / 2);
        if (c !== 1) p.vertex(centerX + w / 2, centerY - h / 2);
        if (c !== 2) p.vertex(centerX + w / 2, centerY + h / 2);
        if (c !== 3) p.vertex(centerX - w / 2, centerY + h / 2);
        p.endShape();
    };

    const drawRect = (x: number, y: number, w: number, h: number) => {
        const paddingW = p.random(0.05, 0.45) * w;
        const paddingH = p.random(0.05, 0.45) * h;
        const newX = x + paddingW;
        const newY = y + paddingH;
        const newW = w - 2 * paddingW;
        const newH = h - 2 * paddingH;
        p.rect(newX, newY, newW, newH);
    };

    const drawCircle = (x: number, y: number, w: number, h: number) => {
        const constrain = Math.min(w, h);
        const d = constrain * p.random(0.4, 0.9);

        const room = (constrain - d) / 2;
        const shiftX = p.random(-1, 1) * room;
        const shiftY = p.random(-1, 1) * room;

        const centerX = x + w / 2;
        const centerY = y + h / 2;
        const newX = centerX + shiftX;
        const newY = centerY + shiftY;
        p.circle(newX, newY, d);
    };

    const drawRectTile = (x: number, y: number, w: number, h: number) => {
        const rw = p.int(p.random(3, 7));
        // rw / h = cl / w
        const cl = p.int((w * rw) / h);
        const newH = h / rw;
        const newW = w / cl;
        for (const i of range(rw)) {
            for (const j of range(cl)) {
                if ((i + j) % 2 !== 0) continue;

                const newX = x + newW * j;
                const newY = y + newH * i;
                p.rect(newX, newY, newW, newH);
            }
        }
    };

    const drawCircleTile = (x: number, y: number, w: number, h: number) => {
        const rw = p.int(p.random(3, 7));
        // rw / h = cl / w
        const cl = p.int((w * rw) / h);
        const newH = h / rw;
        const newW = w / cl;
        for (const i of range(rw)) {
            for (const j of range(cl)) {
                const newX = x + newW * j + newW / 2;
                const newY = y + newH * i + newH / 2;
                const d = Math.min(newW, newH) * 0.5;
                p.circle(newX, newY, d);
            }
        }
    };

    const drawPattern = (x: number, y: number, w: number, h: number) => {
        const color1 = p.random(colorPalette);
        p.fill(color1);
        p.rect(x, y, w, h);

        const color2 = p.random(colorPalette);
        p.fill(color2);

        const drawFuncs = [
            drawTriangle,
            drawCircle,
            drawCircleTile,
            drawRect,
            drawRectTile,
        ];

        const drawFunc: (x: number, y: number, w: number, h: number) => void =
            p.random(drawFuncs);
        drawFunc(x, y, w, h);
    };

    p.setup = () => {
        p.createCanvas(width, height);
        p.background("white");
        p.noLoop();
        p.noStroke();
    };

    p.draw = () => {
        const h = unitH;
        const scales = [0.618, 2 / 3, 1, 1.5, 2, 3, 4, 4.618, 7, 8, 10];
        const weights = scales.map(x => 1 / x);
        const scaleRnd = weightedRandom(scales, weights);

        for (const row of range(rows)) {
            // let shiftX = p.random(scales) * h;
            const shiftX = scaleRnd() * h;
            let x = marginX + shiftX;
            const y = marginY + row * h;
            while (true) {
                const w = scaleRnd() * h;
                if (x + w > width - marginX) break;
                drawPattern(x, y, w, h);
                x += w;
            }
        }
    };
};
