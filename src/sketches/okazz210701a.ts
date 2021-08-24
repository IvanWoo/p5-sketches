import type p5 from "p5";

import { range } from "@thi.ng/iterators";

import { colorhunt } from "./utils/color";

interface Shape {
    x: number;
    y: number;
    w: number;
    h: number;
}

// https://openprocessing.org/sketch/1227171
export const sketch = (p: p5) => {
    const ratio = 7 / 5;
    const width = 1120;
    const height = width / ratio;
    const offset = 100;

    const cc = 5;
    const divideRatios = [...range(cc)].map(x => x / cc);

    const shapes: Shape[] = [];
    let colors: string[] = [];
    colors = colorhunt[p.int(p.random(colorhunt.length))];
    colors = ["#ed3441", "#ffd630", "#329fe3", "#154296", "#ffffff", "#303030"];

    p.setup = () => {
        p.createCanvas(width, height);
        p.background("white");
        p.rectMode(p.CENTER);
        p.noLoop();
    };

    p.draw = () => {
        const bgColIdx = 5;
        const bgCol = colors[bgColIdx];
        const nScl = 0.002;

        p.background(bgCol);
        colors.splice(bgColIdx, 1);

        divideRect(offset, offset, width - offset * 2, height - offset * 2);
        p.shuffle(shapes, true);
        p.stroke(bgCol);
        p.strokeWeight(3);
        for (const s of shapes) {
            p.push();
            p.translate(s.x, s.y);
            p.rotate((p.noise(s.x * nScl, s.y * nScl) - 0.5) * 1.25);
            p.fill(p.random(colors));
            p.rect(0, 0, s.w, s.h, 2);
            p.pop();
        }
    };

    const divideHorizontal = (x: number, y: number, w: number, h: number) => {
        const newW = p.random(divideRatios) * w;
        divideRect(x, y, newW, h);
        divideRect(x + newW, y, w - newW, h);
    };
    const divideVertical = (x: number, y: number, w: number, h: number) => {
        const newH = p.random(divideRatios) * h;
        divideRect(x, y, w, newH);
        divideRect(x, y + newH, w, h - newH);
    };

    const divideRect = (x: number, y: number, w: number, h: number) => {
        const threshold = 35;
        if (Math.min(w, h) >= threshold) {
            w >= h ? divideHorizontal(x, y, w, h) : divideVertical(x, y, w, h);
        } else {
            shapes.push({ x: x + w / 2, y: y + h / 2, w: w - 2, h: h - 2 });
        }
    };
};
