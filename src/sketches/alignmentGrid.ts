import type p5 from "p5";
import { range } from "@thi.ng/iterators";

// https://editor.p5js.org/generative-design/sketches/P_2_1_1_01
export const sketch = (p: p5) => {
    const width = 800;
    const height = 600;
    const tileCount = 30;
    let actRandomSeed = 42;
    let actStrokeCap: any = p.ROUND;

    p.setup = () => {
        p.createCanvas(width, height);
        p.background("white");
        // p.noLoop();
    };

    p.draw = () => {
        p.background("white");
        p.fill("black");
        p.strokeCap(actStrokeCap);
        p.randomSeed(actRandomSeed);
        for (let i of range(tileCount)) {
            for (let j of range(tileCount)) {
                let x = width * (i / tileCount);
                let y = height * (j / tileCount);
                let toggle = p.int(p.random(0, 2));
                if (toggle === 0) {
                    p.strokeWeight(p.mouseX / 30);
                    p.line(x, y, x + width / tileCount, y + height / tileCount);
                } else if (toggle === 1) {
                    p.strokeWeight(p.mouseY / 30);
                    p.line(x, y + height / tileCount, x + width / tileCount, y);
                }
            }
        }
    };

    p.mousePressed = () => {
        actRandomSeed = p.random(100000);
    };

    p.keyReleased = () => {
        if (p.key === "1") actStrokeCap = p.ROUND;
        if (p.key === "2") actStrokeCap = p.SQUARE;
        if (p.key === "3") actStrokeCap = p.PROJECT;
    };
};
