import type p5 from "p5";

import { range } from "@thi.ng/iterators";

import FONT from "../assets/NotoSansJP-Black.otf";

export const sketch = (p: p5) => {
    const width = 800;
    const height = width;
    const fontSize = width / 4;
    const speed = 0.1;
    const steps = 42;
    const txt = "花粉症";
    const strokeColor = "rgba(0,0,0,0.25)";
    let font: p5.Font;
    let counter = 0;

    p.preload = () => {
        font = p.loadFont(FONT);
    };

    p.setup = () => {
        p.createCanvas(width, height);
        p.background("white");
        // p.noLoop();

        p.stroke(strokeColor);
        p.strokeWeight(1);
    };

    p.draw = () => {
        if (counter >= steps) return;
        // p.background("white");
        const points = font.textToPoints(
            txt,
            width / 8,
            (height * 4.5) / 8,
            fontSize,
            {
                sampleFactor: 0.02 * p.sin(p.millis() * speed) + 0.02,
                simplifyThreshold: 0,
            }
        );
        drawChar(points);
        counter += 1;
    };

    p.keyReleased = () => {
        if (p.key === "s") p.saveCanvas("sketchScreenshot", "png");
    };

    const drawChar = points => {
        for (const i of range(points.length - 1)) {
            const p1 = points[i];
            const p2 = points[i + 1];
            p.circle(
                p1.x + p.random(p2.x * 0.01),
                p2.y + p.random(p2.y * 0.01),
                1
            );
            p.line(p1.x, p1.y, p2.x, p2.y);
        }
    };
};
