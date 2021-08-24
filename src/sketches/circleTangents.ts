import type { TwoCircles } from "./utils/api";
import type p5 from "p5";

import { tangents } from "./utils/geom";

export const sketch = (p: p5) => {
    const width = 800;
    const height = width;
    const tests: TwoCircles[] = [
        [200, 200, 50, 600, 600, 80],
        [600, 600, 80, 200, 200, 50],
        [100, 400, 30, 500, 400, 50],
        [500, 400, 50, 100, 400, 30],
        [400, 120, 80, 400, 400, 50],
        [400, 400, 50, 400, 120, 80],
        [100, 520, 150, 400, 100, 50],
        [400, 100, 50, 100, 520, 150],
        [100, 520, 150, 400, 400, 10],
        [400, 400, 10, 100, 520, 150],
    ];
    let counter = 0;

    p.setup = () => {
        p.createCanvas(width, height);
        p.background("white");
        // p.noLoop();
        p.frameRate(2);
        p.strokeWeight(1);
    };

    p.draw = () => {
        p.background("white");
        const test = tests[counter];
        const [x1, y1, r1, x2, y2, r2] = test;
        p.circle(x1, y1, r1 * 2);
        p.circle(x2, y2, r2 * 2);
        const { inner, outer } = tangents(x1, y1, r1, x2, y2, r2);
        drawLines(inner);
        drawLines(outer);
        counter += 1;
        counter %= tests.length;
    };

    p.keyReleased = () => {
        if (p.key === "s") p.saveCanvas("sketchScreenshot", "png");
    };

    const drawLines = (lines: any) => {
        for (const [x1, y1, x2, y2] of lines) {
            p.line(x1, y1, x2, y2);
        }
    };
};
