import type p5 from "p5";
import { range } from "@thi.ng/iterators";
import { normal, SYSTEM } from "@thi.ng/random";

import { colourlovers as colorTemplates } from "./utils/color";

export const sketch = (p: p5) => {
    const width = 800;
    const height = width;
    const centerX = width / 2;
    const centerY = height / 2;
    const diameter = width / 4;
    const colors = p.random(colorTemplates);
    // tweak the shade width
    const normalSigma = 0.2;
    const baseDotNum = 800;
    const configs = {
        outer: [1],
        inner: [-1],
        fuzzy: [-1, 1],
        nipple: [-10, 1],
        cone: [-2, 1, 1],
    };
    const config = configs[p.random(Object.keys(configs))];

    p.setup = () => {
        p.createCanvas(width, height);
        p.background("white");
        p.noLoop();
    };

    p.draw = () => {
        drawOlympic(centerX, centerY);
    };

    p.keyReleased = () => {
        if (p.key === "s") p.saveCanvas("sketchScreenshot", "png");
    };

    const drawOlympic = (x: number, y: number) => {
        p.translate(x, y);
        const relativePos = [
            // black ring
            [0, -diameter / 4],
            // blue ring
            [-diameter, -diameter / 4],
            // red ring
            [diameter, -diameter / 4],
            // yellow ring
            [-diameter / 2, diameter / 4],
            // green ring
            [diameter / 2, diameter / 4],
        ];
        for (let idx of range(relativePos.length)) {
            let [x, y] = relativePos[idx];
            setStrokeColor(idx);
            drawCircle(x, y, diameter);
        }
    };

    const setStrokeColor = (idx: number) => {
        let col = p.color(colors[idx % colors.length]);
        col.setAlpha(p.random(50, 70));
        p.stroke(col);
    };

    const drawCircle = (x: number, y: number, d: number) => {
        shadeCircle(x, y, d);
        // if (d > 30) {
        //     drawCircle(x - d * 0.5, y, d * 0.5);
        //     drawCircle(x + d * 0.5, y, d * 0.5);
        // }
    };

    const shadeCircle = (x: number, y: number, d: number) => {
        let r = d * 0.5;
        let c = p.int(d * baseDotNum);
        let rnd = normal(SYSTEM, 0, normalSigma);
        for (let _ of range(c)) {
            let ang = p.random(p.TAU);
            let rad = p.random(config) * Math.abs(rnd()) + 1;
            p.point(x + p.cos(ang) * r * rad, y + p.sin(ang) * r * rad);
        }
    };
};
