import type p5 from "p5";
import {
    normRange,
    range,
    map,
    mapIndexed,
    push,
    comp,
    transduce,
} from "@thi.ng/transducers";

import { colorhunt as colorPalettes, ringers } from "./utils/color";

export const sketch = (p: p5) => {
    const width = 800;
    const height = width;
    const centerX = width / 2;
    const centerY = height / 2;
    const bgCol = ringers.white;
    const colorPalette = p.random(colorPalettes);

    p.setup = () => {
        p.createCanvas(width, height);
    };

    p.draw = () => {
        p.blendMode(p.BLEND);
        p.background(bgCol);
        // p.blendMode(p.REPLACE);
        // p.blendMode(p.MULTIPLY);
        p.blendMode(p.EXCLUSION);
        p.noStroke();
        p.translate(centerX, centerY);

        drawCircle(18, 50, 20, 100, colorPalette[0]);
        drawCircle(15, 60, 25, 120, colorPalette[1]);
        drawCircle(12, 45, 15, 150, colorPalette[2]);
    };

    const drawCircle = (numP, nm, sm, fcm, color) => {
        let points = transduce(
            comp(
                map(i => i * Math.PI * 2),
                mapIndexed((i, rad) => {
                    let r =
                        height * 0.3 +
                        p.noise(p.frameCount / nm + i) * height * 0.1 +
                        p.sin(p.frameCount / sm + i) * height * 0.05;
                    return [Math.cos(rad) * r, Math.sin(rad) * r];
                })
            ),
            push(),
            normRange(numP)
        );
        p.push();
        // let t = p.map(p.mouseX, 0, width, -5, 5);
        let t = 0;
        p.curveTightness(t);
        p.rotate(p.frameCount / fcm);
        p.fill(color);
        p.beginShape();
        for (let [x, y] of points) {
            p.curveVertex(x, y);
        }
        p.endShape();
        p.pop();
    };

    p.keyReleased = () => {
        if (p.key === "s") p.saveCanvas("sketchScreenshot", "png");
    };
};
