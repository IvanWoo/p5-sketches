import type p5 from "p5";
import { range } from "@thi.ng/iterators";

export const sketch = (p: p5) => {
    const width = 800;
    const height = 800;

    p.setup = () => {
        p.createCanvas(width, height);
        p.background("white");
        p.noLoop();
        p.colorMode(p.HSB);
        p.angleMode(p.DEGREES);
    };

    p.draw = () => {
        p.background("white");
        p.noStroke();

        let seg = 13;
        let w = Math.min(height, width) / seg;
        for (let i of range(seg)) {
            for (let j of range(seg)) {
                let x = i * w + w / 2;
                let y = j * w + w / 2;

                // shift trick
                if ((i + j) % 2 !== 0) {
                    continue;
                }

                let hue1 = p.random(360);
                p.fill(hue1, 100, 100);
                p.ellipse(x, y, w * 0.9);

                let hue2 = (hue1 + 180) % 360;
                p.fill(hue2, 100, 100);
                p.ellipse(x, y, w * 0.6);
            }
        }
    };
};
