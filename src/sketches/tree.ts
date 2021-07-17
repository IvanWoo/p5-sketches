import type p5 from "p5";
import { range } from "@thi.ng/iterators";

export const sketch = (p: p5) => {
    const width = 1200;
    const height = 900;
    const centerX = width / 2;
    const centerY = height;

    const next = (x1: number, y1: number, angle: number, length: number) => {
        const x2 = x1 - length * p.sin(angle);
        const y2 = y1 - length * p.cos(angle);
        return [x2, y2];
    };

    const tree = (x1: number, y1: number, angle: number, depth: number) => {
        p.strokeWeight(0.2 + depth / 2);
        const l = 60 * Math.tanh(depth / 4);

        const [x2, y2] = next(x1, y1, angle, l);
        const [x3, y3] = next(x1, y1, angle, l * 0.7);
        const [x4, y4] = next(x1, y1, angle, l * 0.4);

        const angle1 = angle + 20 + p.random(-15, 15);
        const angle2 = angle - 20 + p.random(-15, 15);
        p.line(x1, y1, x2, y2);
        if (depth > 1) {
            tree(x2, y2, angle1, depth - 1);
            tree(x2, y2, angle2, depth - 1);
            tree(x3, y3, angle1, depth - 1);
            tree(x4, y4, angle2, depth - 1);
        }
    };

    p.setup = () => {
        p.angleMode(p.DEGREES);
        p.createCanvas(width, height);
        p.background("white");
        p.noLoop();
    };

    p.draw = () => {
        p.stroke(0, 150, 0, 100);
        p.strokeWeight(1);
        for (let x of range(300, 1000, 300)) {
            for (let y of range(280, 800, 250)) {
                tree(x, y, p.random(-10, 10), 5);
            }
        }
    };
};
