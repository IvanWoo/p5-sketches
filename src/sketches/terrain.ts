import type p5 from "p5";

import { range } from "@thi.ng/iterators";

export const sketch = (p: p5) => {
    const width = 800;
    const height = 600;

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(0);
        p.noLoop();

        p.colorMode(p.HSB);
    };

    p.draw = () => {
        p.noStroke();

        let shift = 0;

        for (const y of range(300, 501, 1)) {
            for (const x of range(100, 501, 1)) {
                let altitude = 200 * p.noise(x / 100, y / 100);
                altitude += 30 * p.noise(x / 30, y / 30);

                const hue = p.map(altitude, 0, 230, 210, 360);
                p.fill(hue, 100, 100, 0.3);
                p.ellipse(x + shift, y - altitude, 2);
            }
            shift += 1;
        }
    };
};
