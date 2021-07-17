import type p5 from "p5";

export const sketch = (p: p5) => {
    const width = 1000;
    const height = 1000;
    const points: p5.Vector[] = [];
    const speed = 0.005;
    const numSteps = 2;

    p.setup = () => {
        const margin = width * 0.13;
        p.createCanvas(width, height);
        p.background(0);

        const resolution = width * 0.01;
        for (let x = margin; x < width - margin; x += resolution) {
            for (let y = margin; y < height - margin; y += resolution) {
                const point = p.createVector(
                    x + p.random(-10, 10),
                    y + p.random(-10, 10)
                );
                points.push(point);
            }
        }
    };

    p.draw = () => {
        // p.background(0);
        p.noStroke();
        p.fill(255);

        for (let point of points) {
            const r = p.map(point.x, 0, width, 50, 255);
            const g = p.map(point.y, 0, height, 50, 255);
            const b = p.map(point.x, 0, width, 255, 50);
            p.fill(r, g, b);

            let angle = p.map(
                p.noise(point.x * speed, point.y * speed),
                0,
                1,
                0,
                4 * p.PI
            );
            angle += p.random(0, p.PI / 10);
            const direction = p.createVector(
                p.sin(
                    angle *
                        p.map(
                            p.noise(point.y * speed, point.x * speed),
                            0,
                            1,
                            0,
                            4 * p.PI
                        )
                ),
                p.cos(
                    angle *
                        p.map(
                            p.noise(point.x * speed, point.y * speed),
                            0,
                            1,
                            0,
                            4 * p.PI
                        )
                )
            );
            direction.mult(numSteps);
            point.add(direction);
            p.ellipse(point.x, point.y, 1);
        }
    };

    p.mouseClicked = () => {
        p.saveCanvas(`flowfield${Date.now()}`, "png");
    };
};
