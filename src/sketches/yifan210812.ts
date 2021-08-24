import type p5 from "p5";

import { normal, SYSTEM, uniform } from "@thi.ng/random";
import { range, range2d } from "@thi.ng/transducers";

import { ringers } from "./utils/color";

export const sketch = (p: p5) => {
    const width = 800;
    const height = width;
    const bgCol = ringers.black;
    const strokeCol = p.color(ringers.white);

    const uniformRnd = uniform();
    const normalSigma = 2.2;

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(bgCol);
        p.noLoop();
        // strokeCol.setAlpha(100);
        p.stroke(strokeCol);
    };

    p.draw = () => {
        p.background(bgCol);
        const rows = 40;
        const cols = 4;

        for (const [row, col] of range2d(rows, cols)) {
            const dx = width / cols;
            const dy = height / rows;
            const x = dx * col;
            const y = dy * row;

            // vertical lines
            p.push();
            if (uniformRnd() >= 0.95) p.stroke(ringers.yellow);
            if (uniformRnd() >= 0.7) drawLine(x, y, x, y + dy);
            p.pop();

            // horizontal lines
            p.push();
            if (uniformRnd() >= 0.95) p.stroke(ringers.red);
            if (uniformRnd() >= 0.7) drawLine(x, y, x + dx, y);
            p.pop();
        }
    };

    function drawLine(x1, y1, x2, y2) {
        const rnd = normal(SYSTEM, 0, normalSigma);
        const step = 0.1 / 2;
        if (x1 === x2) {
            for (const y of range(y1, y2, step)) {
                const x = x1 + rnd();
                p.point(x, y);
            }
        }

        if (y1 === y2) {
            for (const x of range(x1, x2, step)) {
                const y = y1 + rnd();
                p.point(x, y);
            }
        }
    }

    p.keyReleased = () => {
        if (p.key === "s") p.saveCanvas("sketchScreenshot", "png");
    };
};
