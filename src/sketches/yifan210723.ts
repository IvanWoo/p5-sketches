import type p5 from "p5";
import { cycle } from "@thi.ng/iterators";
import { spiral2d } from "@thi.ng/grid-iterators";
import { colorhunt } from "./utils/color";

export const sketch = (p: p5) => {
    const width = 800;
    const height = width;
    const padding = 50;
    const NB = 15;
    const baseUnit = Math.ceil((width - 2 * padding) / NB);
    const rectSize = 10;
    const colors = cycle(p.random(colorhunt));
    const buckets = cycle(spiral2d(NB));

    p.setup = () => {
        p.createCanvas(width, height);
        p.background("white");
        p.noStroke();
    };

    p.draw = () => {
        p.translate(padding, padding);
        const b = buckets.next();
        let [x, y] = <number[]>b.value;
        x *= baseUnit;
        y *= baseUnit;
        let color = colors.next();
        let col = p.color(color.value as string);
        // col.setAlpha(p.random(100, 150));
        p.fill(col);
        p.rect(
            x + p.noise(p.random(x) * 0.03) * 2,
            y + p.noise(p.random(y) * 0.03) * 2,
            rectSize * 3 * p.noise(p.random(x) * 0.03),
            rectSize * 3 * p.noise(p.random(y) * 0.3)
        );
    };

    p.keyReleased = () => {
        if (p.key === "s") p.saveCanvas("sketchScreenshot", "png");
    };
};
