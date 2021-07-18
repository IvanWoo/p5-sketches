import type p5 from "p5";
import { range } from "@thi.ng/iterators";
import { weightedRandom } from "@thi.ng/random";

import { colorhunt } from "./colorUtils";

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
        let centerX = x + w / 2;
        let centerY = y + h / 2;
        let c = p.int(p.random(4));
        p.beginShape();
        if (c !== 0) p.vertex(centerX - w / 2, centerY - h / 2);
        if (c !== 1) p.vertex(centerX + w / 2, centerY - h / 2);
        if (c !== 2) p.vertex(centerX + w / 2, centerY + h / 2);
        if (c !== 3) p.vertex(centerX - w / 2, centerY + h / 2);
        p.endShape();
    };

    const drawRect = (x: number, y: number, w: number, h: number) => {
        let paddingW = p.random(0.05, 0.45) * w;
        let paddingH = p.random(0.05, 0.45) * h;
        let newX = x + paddingW;
        let newY = y + paddingH;
        let newW = w - 2 * paddingW;
        let newH = h - 2 * paddingH;
        p.rect(newX, newY, newW, newH);
    };

    const drawCircle = (x: number, y: number, w: number, h: number) => {
        let constrain = Math.min(w, h);
        let d = constrain * p.random(0.4, 0.9);

        let room = (constrain - d) / 2;
        let shiftX = p.random(-1, 1) * room;
        let shiftY = p.random(-1, 1) * room;

        let centerX = x + w / 2;
        let centerY = y + h / 2;
        let newX = centerX + shiftX;
        let newY = centerY + shiftY;
        p.circle(newX, newY, d);
    };

    const drawRectTile = (x: number, y: number, w: number, h: number) => {
        let rw = p.int(p.random(3, 7));
        // rw / h = cl / w
        let cl = p.int((w * rw) / h);
        let newH = h / rw;
        let newW = w / cl;
        for (let i of range(rw)) {
            for (let j of range(cl)) {
                if ((i + j) % 2 !== 0) continue;

                let newX = x + newW * j;
                let newY = y + newH * i;
                p.rect(newX, newY, newW, newH);
            }
        }
    };

    const drawCircleTile = (x: number, y: number, w: number, h: number) => {
        let rw = p.int(p.random(3, 7));
        // rw / h = cl / w
        let cl = p.int((w * rw) / h);
        let newH = h / rw;
        let newW = w / cl;
        for (let i of range(rw)) {
            for (let j of range(cl)) {
                let newX = x + newW * j + newW / 2;
                let newY = y + newH * i + newH / 2;
                let d = Math.min(newW, newH) * 0.5;
                p.circle(newX, newY, d);
            }
        }
    };

    const drawPattern = (x: number, y: number, w: number, h: number) => {
        let color1 = p.random(colorPalette);
        p.fill(color1);
        p.rect(x, y, w, h);

        let color2 = p.random(colorPalette);
        p.fill(color2);

        let drawFuncs = [
            drawTriangle,
            drawCircle,
            drawCircleTile,
            drawRect,
            drawRectTile,
        ];

        let drawFunc: (x: number, y: number, w: number, h: number) => void =
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

        for (let row of range(rows)) {
            // let shiftX = p.random(scales) * h;
            let shiftX = scaleRnd() * h;
            let x = marginX + shiftX;
            let y = marginY + row * h;
            while (true) {
                let w = scaleRnd() * h;
                if (x + w > width - marginX) break;
                drawPattern(x, y, w, h);
                x += w;
            }
        }
    };
};
