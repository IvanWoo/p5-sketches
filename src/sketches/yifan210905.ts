import type p5 from "p5";

import { normal, SYSTEM, uniform } from "@thi.ng/random";
import { range2d } from "@thi.ng/transducers";

import { ringers } from "./utils/color";

export const sketch = (p: p5) => {
    const width = 800;
    const height = width;
    const padding = width * 0.1;
    const partition = 15;
    const unitW = (width - padding * 2) / (partition - 1);
    const rectRadius = unitW / 4.2;
    const bgCol = "white";

    const dieConfig = {
        1: [[0, 0]],
        2: [
            [-1, -1],
            [1, 1],
        ],
        3: [
            [-1, -1],
            [0, 0],
            [1, 1],
        ],
        4: [
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1],
        ],
        5: [
            [-1, -1],
            [-1, 1],
            [0, 0],
            [1, -1],
            [1, 1],
        ],
        6: [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [1, -1],
            [1, 0],
            [1, 1],
        ],
    };

    const dieColors = [
        ringers.white,
        "#a4459f",
        "#cae509",
        "#f70640",
        "#f78e2c",
        "#fdd903",
        "#cae509",
        "#63be93",
        "#81cfe5",
        "#299dbf",
    ];
    const dotColor = [
        ringers.black,
        ringers.white,
        ringers.black,
        ringers.white,
        ringers.black,
        ringers.black,
        ringers.white,
        ringers.white,
        ringers.black,
        ringers.white,
    ];

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(bgCol);
        p.noLoop();
        // p.frameRate(2);
        p.rectMode(p.CENTER);
        p.noStroke();
    };

    p.draw = () => {
        const numRnd = uniform(SYSTEM, 1, 6);
        const colRnd = uniform(SYSTEM, 0, dieColors.length - 1);
        for (const [i, j] of range2d(partition, partition)) {
            const centerX = i * unitW + padding;
            const centerY = j * unitW + padding;
            const col = Math.round(colRnd());
            const dieCol = dieColors[col];
            const dotCol = dotColor[col];
            p.push();
            p.translate(centerX, centerY);

            p.fill(dieCol);
            p.rect(0, 0, unitW, unitW, rectRadius);

            p.random() > 0.5 ? p.rotate(p.HALF_PI) : null;
            p.fill(dotCol);
            const num = Math.round(numRnd());
            drawDie(0, 0, unitW, num);

            p.pop();
        }
    };

    const drawDie = (x, y, w, num) => {
        // r is the radius of the dots
        // m is the margin between dots
        // 6r + 4m = w
        // ratio = r / m
        const ratio = 0.5;
        const r = (w * ratio) / (6 * ratio + 4);
        const m = r / ratio;
        for (const [i, j] of dieConfig[num]) {
            const newX = (m + 2 * r) * i + x;
            const newY = (m + 2 * r) * j + y;
            p.circle(newX, newY, 2 * r);
        }
    };

    p.keyReleased = () => {
        if (p.key === "s") p.saveCanvas("sketchScreenshot", "png");
    };
};
