import type p5 from "p5";

import {
    range,
    range2d,
    comp,
    push,
    map,
    transduce,
    partition,
    wrapSides,
    reduce,
    multiplexObj,
} from "@thi.ng/transducers";

import { ringers } from "./utils/color";
import { tangents } from "./utils/geom";

class Peg {
    p: p5;
    idx: number;
    x: number;
    y: number;
    d: number;
    r: number;
    color: string;

    constructor(p, idx, x, y, d, color) {
        this.p = p;
        this.idx = idx;
        this.x = x;
        this.y = y;
        this.d = d;
        this.r = d / 2;
        this.color = color;
    }

    draw(): void {
        this.p.push();
        this.p.fill(this.color);
        this.p.circle(this.x, this.y, this.d);
        // this.debug();
        this.p.pop();
    }

    debug(): void {
        this.p.push();
        this.p.noStroke();
        this.p.fill(ringers.red);
        this.p.textSize(48);
        this.p.text(this.idx, this.x, this.y);
        this.p.pop();
    }
}

export const sketch = (p: p5) => {
    const width = 800;
    const height = width;
    const padding = width * 0.2;
    const rows = 4;
    const cols = 4;
    const unitSpace = (width - 2 * padding) / (Math.max(rows, cols) - 1);
    const diameter = unitSpace * 0.6;
    const margin = unitSpace * 0.3;

    const pegs: Peg[] = [];
    const connections = [2, 3, 7, 11, 15, 12, 9, 8];

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(ringers.white);
        p.noLoop();
        p.stroke(ringers.black);
        p.strokeWeight(6);
        p.textAlign(p.CENTER, p.CENTER);

        const colors = transduce(
            comp(
                map(x =>
                    [2, 3, 5, 8, 11, 12].includes(x)
                        ? ringers.black
                        : [15].includes(x)
                        ? ringers.yellow
                        : ringers.white
                )
            ),
            push(),
            range(rows * cols)
        );

        for (const i of range(rows)) {
            for (const j of range(cols)) {
                const idx = i * rows + j;
                const x = j * unitSpace + padding;
                const y = i * unitSpace + padding;
                const color = colors[idx];
                pegs.push(new Peg(p, idx, x, y, diameter, color));
            }
        }
    };

    p.draw = () => {
        for (const peg of pegs) {
            peg.draw();
        }
        const lines = transduce(
            comp(
                map(x => pegs[x]),
                partition(2, 1),
                map(([p1, p2]) => {
                    const { inner, outer } = tangents(
                        p1.x,
                        p1.y,
                        p1.r,
                        p2.x,
                        p2.y,
                        p2.r
                    );
                    return p.random([...inner, ...outer]);
                })
            ),
            push(),
            wrapSides(connections, 0, 1)
        );
        drawLines(lines);
    };

    const drawLines = (lines: any): void => {
        for (const [x1, y1, x2, y2] of lines) {
            p.line(x1, y1, x2, y2);
        }
    };

    p.keyReleased = () => {
        if (p.key === "s") p.saveCanvas("sketchScreenshot", "png");
    };
};
