import type p5 from "p5";

import { weightedRandom } from "@thi.ng/random";
import * as tx from "@thi.ng/transducers";
import { zeroes } from "@thi.ng/vectors";

import { colorhunt, ringers } from "./utils/color";

export const sketch = (p: p5) => {
    const debug = 0;
    const colorRecPercentage = 0.15;
    const unit = 40;
    const cols = 24;
    const rows = 32;
    const width = unit * cols;
    const height = unit * rows;
    const bgCol = "white";
    let colors = [ringers.white, ringers.black];
    colors = colorhunt[p.int(p.random(colorhunt.length))];
    const grid = [...zeroes(rows)].map(_ => zeroes(cols));

    const createEvenRnd = (min: number, max: number) => {
        const evens: number[] = tx.transduce(
            tx.filter(x => x === 1 || x % 2 === 0),
            tx.push(),
            tx.range(min, max + 1)
        );

        const weights: number[] = tx.transduce(
            tx.map(x => 1 / x ** 2 + x),
            tx.push(),
            evens
        );
        if (debug) {
            console.log(evens);
            console.log(weights);
        }
        return weightedRandom(evens, weights);
    };

    const createRatioRnd = (min: number, max: number) => {
        const vals = [...tx.range(min, max + 1)];

        const weights: number[] = tx.transduce(
            tx.map(x => 1 / x ** 3.25),
            tx.push(),
            vals
        );
        return weightedRandom(vals, weights);
    };

    const ratioRnd = createRatioRnd(1, 6);
    const evenRnd = createEvenRnd(1, 6);

    const drawRectTile = (
        x: number,
        y: number,
        w: number,
        h: number,
        ratio: number
    ) => {
        // rw stands for row, cl stands for col
        const rw = evenRnd() * ratio;
        // rw / h = cl / w
        const cl = p.int((w * rw) / h);
        const newH = (h * ratio) / rw;
        const newW = (w * ratio) / cl;
        for (const i of tx.range(rw)) {
            for (const j of tx.range(cl)) {
                if ((i + j) % 2 !== 0) continue;

                const newX = x + newW * j;
                const newY = y + newH * i;
                p.rect(newX, newY, newW, newH);
            }
        }
    };

    const drawRect = (
        x: number,
        y: number,
        w: number,
        h: number,
        ratio: number
    ) => {
        p.rect(x, y, w * ratio, h * ratio);
    };

    p.setup = () => {
        p.createCanvas(width, height);
        // p.frameRate(6);
        p.background(bgCol);
        p.noLoop();
    };

    p.draw = () => {
        for (const [row, col] of tx.range2d(rows, cols)) {
            let noDraw = false;

            const ratio = ratioRnd();
            // const ratio = 1;
            if (debug) console.log(ratio);
            for (const [i, j] of tx.range2d(ratio, ratio)) {
                const [r, c] = [row + i, col + j];
                if (r < 0 || r >= rows || c < 0 || c >= cols) continue;
                if (grid[r][c] === 1) {
                    noDraw = true;
                }
                grid[row + i][col + j] = 1;
            }
            // const rectCol = colors[(idx + p.int(p.random(4))) % colors.length];
            if (noDraw) continue;

            const [x, y, w, h] = [col * unit, row * unit, unit, unit];
            if (p.random() < colorRecPercentage) {
                const rectCol = p.random(colors);
                p.noStroke();
                p.fill(rectCol);
                drawRect(x, y, w, h, ratio);
            } else {
                p.noStroke();
                p.fill("black");
                drawRectTile(x, y, w, h, ratio);
            }
        }

        if (debug) {
            console.log(grid);
            p.stroke(255, 204, 0);
            p.noFill();
            for (const [row, col] of tx.range2d(rows, cols)) {
                const [x, y, w, h] = [col * unit, row * unit, unit, unit];
                drawRect(x, y, w, h, 1);
            }
        }
    };

    p.keyReleased = () => {
        if (p.key === "s") p.saveCanvas("sketchScreenshot", "png");
    };
};
