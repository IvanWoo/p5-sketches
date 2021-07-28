import type p5 from "p5";
import { range } from "@thi.ng/iterators";

import { tangents } from "./utils/geom";
import { ringers } from "./utils/color";

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

    connect(peg: Peg): void {
        let { inner, outer } = tangents(
            this.x,
            this.y,
            this.r,
            peg.x,
            peg.y,
            peg.r
        );
        this.drawLines([this.p.random([...inner, ...outer])]);
    }

    drawLines(lines: any): void {
        for (let [x1, y1, x2, y2] of lines) {
            this.p.line(x1, y1, x2, y2);
        }
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

    let pegs: Peg[] = [];

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(ringers.white);
        p.noLoop();
        p.stroke(ringers.black);
        p.strokeWeight(6);
        p.textAlign(p.CENTER, p.CENTER);

        let colors = [...range(rows * cols)].map(_ => ringers.white);
        for (let blackIdx of [2, 3, 5, 8, 11, 12]) {
            colors[blackIdx] = ringers.black;
        }
        colors[15] = ringers.yellow;

        for (let i of range(rows)) {
            for (let j of range(cols)) {
                let idx = i * rows + j;
                let x = j * unitSpace + padding;
                let y = i * unitSpace + padding;
                let color = colors[idx];
                pegs.push(new Peg(p, idx, x, y, diameter, color));
            }
        }
    };

    p.draw = () => {
        for (let peg of pegs) {
            peg.draw();
        }
        pegs[2].connect(pegs[3]);
        pegs[3].connect(pegs[15]);
        pegs[12].connect(pegs[15]);
        pegs[9].connect(pegs[12]);
        pegs[9].connect(pegs[8]);
        pegs[8].connect(pegs[2]);
    };

    p.keyReleased = () => {
        if (p.key === "s") p.saveCanvas("sketchScreenshot", "png");
    };
};
