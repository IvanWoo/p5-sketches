import type p5 from "p5";

import { range } from "@thi.ng/transducers";

import { ringers } from "./utils/color";

export const sketch = (p: p5) => {
    const width = 800;
    const height = width;
    const centerX = width / 2;
    const centerY = height / 2;

    const bgColor = ringers.white;
    const mainColor = ringers.black;

    const num = 10;
    const hRatio = 0.85;
    const sRatio = 1 - hRatio;
    const h = (height / num) * hRatio;
    const s = (height / num) * sRatio;

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(bgColor);
        p.noLoop();
    };

    p.draw = () => {
        p.stroke(mainColor);
        p.strokeWeight(1);
        // p.noStroke();
        p.fill(mainColor);
        let [x, y] = [centerX, 0];
        for (const i of range(num)) {
            y = i * (h + s);
            const w = p.random(0.2, 0.6) * width;
            // w = 0.32 * width;
            // w = p.sin(p.map(i, 0, num, 0, 1)) * width;
            if (i % 2 !== 0) x -= w;
            p.rect(x, y, w, h);
            if (i % 2 === 0) x += w;

            const angle = (i % 2) * p.PI + p.HALF_PI;
            const start = -angle;
            const end = angle;
            drawConnectArc(x, y, start, end);
        }
    };

    const drawConnectArc = (x, y, start, end) => {
        // big outer arc
        const arcW = 2 * h + s;
        p.arc(x, y + h + s / 2, arcW, arcW, start, end);

        // small inner arc
        p.push();
        p.fill(bgColor);
        p.arc(x, y + h + s / 2, s, s, start, end);

        // hack to clean up the stroke
        p.stroke(bgColor);
        p.line(x, y + h + 1, x, y + h + s - 1);
        p.pop();
    };

    p.keyReleased = () => {
        if (p.key === "s") p.saveCanvas("sketchScreenshot", "png");
    };
};
