import type p5 from "p5";

import * as tx from "@thi.ng/transducers";

// basic fluid flow
export const sketch = (p: p5) => {
    const width = 400 * 2;
    const height = width;
    const bgCol = "white";
    const inc = 0.1 * 1;
    const scl = 10 * 1;
    const rows = p.floor(width / scl);
    const cols = p.floor(height / scl);
    const fr = p.createP("");
    let zoff = 0;

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(bgCol);
        // p.noLoop();
    };

    p.draw = () => {
        p.background(bgCol);
        let yoff = 0;
        for (const y of tx.range(rows)) {
            let xoff = 0;
            for (const x of tx.range(cols)) {
                const index = (x + y + width) * 4;
                const n = p.noise(xoff, yoff, zoff);
                const ang = n * p.PI * 2;
                const newX = Math.cos(ang) + x;
                const newY = Math.sin(ang) + y;
                p.line(x * scl, y * scl, newX * scl, newY * scl);
                xoff += inc;
            }
            yoff += inc;
        }
        zoff += inc / 10;
        fr.html(p.floor(p.frameRate()));
    };

    p.keyReleased = () => {
        if (p.key === "s") p.saveCanvas("sketchScreenshot", "png");
    };
};
