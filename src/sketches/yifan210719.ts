import type p5 from "p5";

export const sketch = (p: p5) => {
    const width = 800;
    const height = width;
    const centerX = width / 2;
    const centerY = height / 2;
    const constrainR = (width * 0.9) / 2;
    let speed = 0.001;
    let magicKnob = 4.2;
    magicKnob = 8.21;
    // magicKnob = 3;
    const initIsBlack = true;
    const lightGrey = "#d3d3d3";

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(lightGrey);
        // p.noLoop();
        p.frameRate(30);
    };

    p.draw = () => {
        p.translate(centerX, centerY);
        p.background(lightGrey);
        p.rotate(p.millis() * speed);

        // the static canvas
        p.fill(initIsBlack ? "black" : "white");
        p.circle(0, 0, constrainR * 2 * 1.01);

        drawCircle(0, 0, constrainR * 2, initIsBlack);
    };

    const clamp = (min: number, max: number, val: number) => {
        return Math.min(max, Math.max(min, val));
    };

    const drawCircle = (x: number, y: number, d: number, isBlack: boolean) => {
        p.fill(isBlack ? "black" : "white");
        p.noStroke();
        p.circle(x, y, d);
        if (d > 30) {
            let leftBoundary = Math.abs(x - d / 2);
            let rightBoundary = Math.abs(x + d / 2);
            let newX = clamp(-d, d, x + magicKnob * p.sin(x + centerX));
            let min = Math.min(leftBoundary, rightBoundary);
            let newR = Math.min(min, (d - 10) / 2);
            drawCircle(newX, y, newR * 2, !isBlack);
        }
    };
};
