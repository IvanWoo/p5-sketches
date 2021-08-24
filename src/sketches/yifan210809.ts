import type p5 from "p5";

import { uniform, weightedRandom } from "@thi.ng/random";
import { range } from "@thi.ng/transducers";

import { ringers } from "./utils/color";

export const sketch = (p: p5) => {
    const width = 800;
    const height = width;
    const centerX = width / 2;
    const centerY = height / 2;
    const bgCol = ringers.white;

    const palette = [ringers.black, ringers.white, ringers.yellow, ringers.red];
    const weights = [1, 0, 0.1, 0.1];
    const colorRnd = weightedRandom(palette, weights);

    const sweetSpot = 0.21;

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(bgCol);
        p.noStroke();
        p.noLoop();
    };

    p.draw = () => {
        p.fill(ringers.black);
        drawPattern(centerX, centerY, width * 0.55);
    };

    const drawPattern = (x, y, d) => {
        if (d <= width * 0.005) return;

        const col = p.color(colorRnd());
        // col.setAlpha(180);

        p.fill(col);
        p.circle(x, y, d);

        for (const [pathX, pathY, newD] of arcPos(
            x,
            y,
            d / 2 + d * sweetSpot,
            d * sweetSpot
        )) {
            drawPattern(pathX, pathY, newD);
        }
    };

    function* arcPos(x, y, distance, d) {
        const rnd = uniform();
        const start = rnd();
        const end = start + rnd();
        const TWO_PI = 2 * Math.PI;
        const step = (d / 10) * (d <= width * 0.06 ? 0.13 : 0.009);
        for (let angle of range(start, end, step)) {
            angle = TWO_PI * (1 - angle);
            const pathX = x + Math.cos(angle) * distance;
            const pathY = y + Math.sin(angle) * distance;
            yield [pathX, pathY, d];
        }
    }

    p.keyReleased = () => {
        if (p.key === "s") p.saveCanvas("sketchScreenshot", "png");
    };
};
