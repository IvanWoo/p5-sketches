import type p5 from "p5";
import { range } from "@thi.ng/iterators";

// https://openprocessing.org/sketch/478216
export const sketch = (p: p5) => {
    const width = 800;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;

    const holocrux = (x: number, y: number, s: number) => {
        if (s > 6) {
            p.ellipse(x, y, s);

            // smaller holocrux just inside the main circle
            holocrux(x - s / 3, y, s / 3);
            holocrux(x + s / 3, y, s / 3);
            holocrux(x, y - s / 3, s / 3);
            holocrux(x, y + s / 3, s / 3);

            // smaller holocrux just outside the main circle
            holocrux(x + (2 * s) / 3, y, s / 3);
            holocrux(x - (2 * s) / 3, y, s / 3);
            holocrux(x, y + (2 * s) / 3, s / 3);
            holocrux(x, y - (2 * s) / 3, s / 3);
        }
    };

    p.setup = () => {
        p.createCanvas(width, height);
        p.background("white");
        p.noLoop();
    };

    p.draw = () => {
        p.strokeWeight(2);
        // p.stroke(255, 0, 0, 30);
        p.noStroke();
        p.fill(255, 0, 0, 30);
        holocrux(centerX, centerY, 300);
    };
};
