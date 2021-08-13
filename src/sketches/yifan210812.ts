import type p5 from "p5";
import { range, range2d } from "@thi.ng/transducers";
import { normal, SYSTEM, uniform } from "@thi.ng/random";

import { ringers } from "./utils/color";

export const sketch = (p: p5) => {
    const width = 800;
    const height = width;
    const bgCol = ringers.black;
    let strokeCol = p.color(ringers.white);

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
        let rows = 40;
        let cols = 4;

        for (let [row, col] of range2d(rows, cols)) {
            let dx = width / cols;
            let dy = height / rows;
            let x = dx * col;
            let y = dy * row;

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
        let rnd = normal(SYSTEM, 0, normalSigma);
        let step = 0.1 / 2;
        if (x1 === x2) {
            for (let y of range(y1, y2, step)) {
                let x = x1 + rnd();
                p.point(x, y);
            }
        }

        if (y1 === y2) {
            for (let x of range(x1, x2, step)) {
                let y = y1 + rnd();
                p.point(x, y);
            }
        }
    }

    p.keyReleased = () => {
        if (p.key === "s") p.saveCanvas("sketchScreenshot", "png");
    };
};
