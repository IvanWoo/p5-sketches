import type p5 from "p5";

import { weightedRandom } from "@thi.ng/random";
import * as tx from "@thi.ng/transducers";

interface Point {
    i: number;
    x: number;
    y: number;
}

function* interpolate2D(points: Array<Point>, steps: number) {
    const xs = [
        ...tx.iterator(
            tx.comp(tx.interpolateLinear(steps)),
            points.map(p => p.x)
            // tx.extendSides(points.map(p => p.x), 1, 2)
        ),
    ];
    const ys = [
        ...tx.iterator(
            tx.comp(tx.interpolateLinear(steps)),
            points.map(p => p.y)
            // tx.extendSides(points.map(p => p.x), 1, 2)
        ),
    ];
    for (const i of tx.range(steps)) {
        yield { i, x: xs[i], y: ys[i] };
    }
}

const createStepsRnd = (min: number, max: number) => {
    const vals = [...tx.range(min, max + 1)];

    const weights: number[] = tx.transduce(
        tx.map(x => 1 / x),
        tx.push(),
        vals
    );
    return weightedRandom(vals, weights);
};

const stepsRnd = createStepsRnd(2, 20);

// fluid flow
export const sketch = (p: p5) => {
    const debug = 0;

    const bgCol = "#e7e6e1";
    const strokeCol = "#292929";
    const mainCol = "#F04537";

    const marginX = 50;
    const marginY = 50;
    const width = 400 * 2.5;
    const height = width;
    const inc = 0.1 * 1;
    const scl = 10 * 3;
    const rowRatio = 1;
    const colRatio = 1;
    const rowScl = scl * rowRatio;
    const colScl = scl * colRatio;
    const rows = p.floor(width / rowScl);
    const cols = p.floor(height / colScl);
    const fr = p.createP("");
    let zoff = 0;

    p.setup = () => {
        p.createCanvas(width + marginX, height + marginY);
        p.background(bgCol);
        p.fill(mainCol);
        p.stroke(strokeCol);
        p.strokeWeight(p.random(0.3, 1.3));
        p.frameRate(1);
        // p.noLoop();
    };

    p.draw = () => {
        p.background(bgCol);
        let yoff = 0;
        for (const y of tx.range(rows)) {
            let xoff = 0;
            for (const x of tx.range(cols)) {
                const n = p.noise(xoff, yoff, zoff);
                const ang = n * p.PI * 2;
                const newX = Math.cos(ang) + x;
                const newY = Math.sin(ang) + y;

                if (debug)
                    p.line(
                        x * scl + marginX,
                        y * scl + marginY,
                        newX * scl + marginX,
                        newY * scl + marginY
                    );

                const steps = stepsRnd();
                const size =
                    steps < 5 ? p.random(0.8, 2.5) : p.random(0.8, 2.2);
                for (const point of interpolate2D(
                    [
                        { i: 0, x, y },
                        { i: 1, x: newX, y: newY },
                    ],
                    steps
                )) {
                    p.circle(
                        point.x * rowScl + marginX,
                        point.y * colScl + marginY,
                        point.i * size
                    );
                }
                xoff += inc;
            }
            yoff += inc;
        }
        zoff += inc / 10;

        if (debug) fr.html(p.floor(p.frameRate()));
    };

    p.keyReleased = () => {
        if (p.key === "s") p.saveCanvas("sketchScreenshot", "png");
    };
};
