import type p5 from "p5";

import { normal, SYSTEM, uniform } from "@thi.ng/random";
import { range, range2d } from "@thi.ng/transducers";

import { ringers } from "./utils/color";

export const sketch = (p: p5) => {
    const width = 800;
    const height = width;
    const bgCol = ringers.white;

    const uniformRnd = uniform();
    const hasFrame = false;
    const normalSigma = 0.2;

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(bgCol);
        p.rectMode(p.CENTER);
        p.noLoop();
    };

    p.draw = () => {
        p.stroke(ringers.black);
        rectRec(20, 20, width - 40, 150);
    };

    function rectRec(x, y, w, minSize) {
        const cRnd = uniform(SYSTEM, 2, 4);
        const c = Math.round(cRnd());
        const newW = w / c;
        for (const [j, i] of range2d(c, c)) {
            const newX = x + i * newW;
            const newY = y + j * newW;
            if (newW > minSize && uniformRnd() < 0.6) {
                rectRec(newX, newY, newW, minSize);
            } else {
                drawPattern(newX, newY, newW);
            }
        }
    }

    function drawPattern(x, y, w) {
        if (hasFrame) {
            p.rect(x + w / 2, y + w / 2, w - 10, w - 10);
            drawShades(x + 10, x + w - 10, y + 10, y + w - 10);
        } else {
            drawShades(x, x + w, y, y + w);
        }
    }

    function drawShades(x1, x2, y1, y2) {
        const direction = uniformRnd();
        const step = 0.01;
        const rnd = normal(SYSTEM, 0, normalSigma);
        if (uniformRnd() >= 0.5) {
            // vertically
            for (const x of range(x1, x2, step)) {
                const dis = Math.abs(rnd()) * (y2 - y1);
                const y = direction >= 0.5 ? y2 - dis : y1 + dis;
                p.point(x, y);
            }
        } else {
            // horizontally
            for (const y of range(y1, y2, step)) {
                const dis = Math.abs(rnd()) * (x2 - x1);
                const x = direction >= 0.5 ? x2 - dis : x1 + dis;
                p.point(x, y);
            }
        }
    }

    p.keyReleased = () => {
        if (p.key === "s") p.saveCanvas("sketchScreenshot", "png");
    };
};
