import type p5 from "p5";

import { range } from "@thi.ng/iterators";

export const sketch = (p: p5) => {
    const scale = 1;
    const width = 800 * scale;
    const height = width;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 4;
    const diameter = radius * 2;
    const baseUnit = 10;
    const steps = radius / baseUnit;
    const white = "white";
    const black = "black";

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(white);
        p.noLoop();
        p.noStroke();
        p.angleMode(p.DEGREES);
    };

    p.draw = () => {
        p.translate(centerX, centerY);
        p.rotate(p.random() >= 0.5 ? 180 : 90);
        const drawPatternFuncs = [drawPattern1, drawPattern2, drawPattern3];
        p.random(drawPatternFuncs)();
    };

    const drawPattern1 = () => {
        drawRectsHorizontal(0, baseUnit, radius, radius, steps);
        drawCircles(0, 0, diameter, steps);
        drawRectsVertical(-radius, -radius, radius, radius, steps);
    };

    const drawPattern2 = () => {
        drawRectsVertical(-radius, -radius, radius, radius, steps);
        drawRectsVertical(baseUnit, 0, radius, radius, steps);
        drawCircles(0, 0, diameter, steps);
        drawRectsVertical(baseUnit, -radius, radius, radius, steps);
        drawRectsVertical(-radius, 0, radius, radius, steps);
    };

    const drawPattern3 = () => {
        drawRectsVertical(-radius, -radius, radius, radius, steps);
        drawCircles(0, 0, diameter, steps);
        drawRectsVertical(baseUnit, 0, radius, radius, steps);
        drawRectsHorizontal(0, -radius, radius, radius, steps);
    };

    const drawCircles = (x, y, d, steps) => {
        for (const i of range(steps)) {
            p.fill(i % 2 === 0 ? black : white);
            p.circle(x, y, d - (i * d) / steps);
        }
    };

    const drawRects = (x, y, w, h, steps, isVertical) => {
        const newW = w / steps;
        const newH = h / steps;
        for (const i of range(steps - 1)) {
            p.fill(i % 2 === 0 ? black : white);
            isVertical
                ? p.rect(x + newW * i, y, newW, h)
                : p.rect(x, y + newH * i, w, newH);
        }
    };

    const drawRectsVertical = (x, y, w, h, steps) => {
        drawRects(x, y, w, h, steps, true);
    };
    const drawRectsHorizontal = (x, y, w, h, steps) => {
        drawRects(x, y, w, h, steps, false);
    };
};
