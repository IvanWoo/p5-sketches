import type p5 from "p5";
import { range2d } from "@thi.ng/transducers";
import { weightedRandom } from "@thi.ng/random";

import { ringers } from "./utils/color";

export const sketch = (p: p5) => {
    const width = 800;
    const height = width;
    const padding = width * 0.05;
    const bigN = 10;
    const smallN = 2 * bigN - 1;
    // bigD * bigN + smallD * (bigN - 1) = width - padding * 2
    // smallD = bigD / ratio
    const ratio = 3;
    const bigD = (width - padding * 2) / (((ratio + 1) * bigN - 1) / ratio);
    const smallD = bigD / ratio;

    const palette = [ringers.black, ringers.white, ringers.yellow, ringers.red];
    const weights = [1, 1.25, 0.1, 0.1];
    const colorRnd = weightedRandom(palette, weights);
    const bgCol = ringers.black;

    p.setup = () => {
        p.createCanvas(width, height);
        p.frameRate(4);
        p.noLoop();
    };

    p.draw = () => {
        p.background(bgCol);
        p.noStroke();
        drawBigCircles();
        drawSmallCircles();
    };

    const drawBigCircles = () => {
        for (let [col, row] of range2d(bigN, bigN)) {
            let dis = bigD + smallD;
            let x = col * dis + bigD / 2 + padding;
            let y = row * dis + bigD / 2 + padding;
            p.fill(colorRnd());
            p.circle(x, y, bigD);
        }
    };

    const drawSmallCircles = () => {
        for (let [col, row] of range2d(smallN, smallN)) {
            if ((col + row) % 2 === 1) continue;
            let dis = (bigD + smallD) / 2;
            let x = col * dis + bigD / 2 + padding;
            let y = row * dis + bigD / 2 + padding;
            p.fill(colorRnd());
            p.circle(x, y, smallD);
        }
    };

    p.keyReleased = () => {
        if (p.key === "s") p.saveCanvas("sketchScreenshot", "png");
    };
};