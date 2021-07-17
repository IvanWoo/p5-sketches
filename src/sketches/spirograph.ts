import type p5 from "p5";
import { range } from "@thi.ng/iterators";

// https://openprocessing.org/sketch/474017
export const sketch = (p: p5) => {
    const width = 800;
    const height = 600;

    p.setup = () => {
        p.createCanvas(width, height);
        p.background("white");
        p.noLoop();
    };

    p.draw = () => {
        p.background("white");

        p.fill(255, 0, 0, 5);
        p.noStroke();

        p.angleMode(p.DEGREES);

        const radius = 180;
        const step = 0.1;

        for (let angle of range(0, 360, step)) {
            for (let t of range(0, 100, 1)) {
                let x1 = radius * p.cos(angle + 0.1 * t);
                let y1 = radius * p.sin(angle + 0.1 * t);

                let x2 = (radius / 3) * p.cos(5 * 3 * (angle + 0.2 * t));
                let y2 = (radius / 3) * p.sin(5 * 3 * (angle + 0.2 * t));

                let x3 = (radius / 6) * p.cos(5 * 4 * (angle + 0.3 * t));
                let y3 = (radius / 6) * p.sin(5 * 4 * (angle + 0.3 * t));

                let x = x1 + x2 + x3;
                let y = y1 + y2 + y3;

                p.ellipse(400 + x, 300 - y, 2);
            }
        }
    };
};
