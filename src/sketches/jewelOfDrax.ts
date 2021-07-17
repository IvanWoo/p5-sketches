import type p5 from "p5";

export const sketch = (p: p5) => {
    const width = 800;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;

    const jewelOfDrax = (x: number, y: number, s: number) => {
        p.rect(x, y, s, s);

        if (s > 20) {
            const r = p.int(p.random(2));

            if (r === 0) {
                jewelOfDrax(x, y, s / 2);
                jewelOfDrax(x + s / 2, y + s / 2, s / 2);
            } else if (r === 1) {
                jewelOfDrax(x + s / 2, y, s / 2);
                jewelOfDrax(x, y + s / 2, s / 2);
            }
        }
    };

    p.setup = () => {
        p.createCanvas(width, height);
        p.background("white");
        p.noLoop();
    };

    p.draw = () => {
        p.strokeWeight(2);
        // p.stroke(255, 0, 0, 30);
        p.noStroke();
        p.fill(255, 0, 0, 30);
        jewelOfDrax(centerX, centerY, 300);
    };
};
