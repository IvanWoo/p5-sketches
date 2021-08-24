import type p5 from "p5";

import { range } from "@thi.ng/iterators";

class ComplexNumber {
    real: number;
    imag: number;

    constructor(real: number, imag: number) {
        this.real = real;
        this.imag = imag;
    }

    next(c: ComplexNumber) {
        // apply z^2 + c
        const real = this.real * this.real - this.imag * this.imag + c.real;
        const imag = 2 * this.real * this.imag + c.imag;
        return new ComplexNumber(real, imag);
    }
}

// https://openprocessing.org/sketch/492777
export const sketch = (p: p5) => {
    const width = 600;
    const height = 600;

    p.setup = () => {
        p.createCanvas(width, height);
        p.background("white");
        p.noLoop();
    };

    p.draw = () => {
        for (const x of range(width)) {
            for (const y of range(height)) {
                const a = p.map(x, 0, 599, -1.5, -0.5);
                const b = p.map(y, 0, 599, -0.5, 0.5);
                const c = new ComplexNumber(a, b);
                let z = new ComplexNumber(0, 0);

                let iteration = 0;
                for (const i of range(50)) {
                    if (p.dist(0, 0, z.real, z.imag) >= 2) {
                        break;
                    }
                    iteration = i;
                    z = z.next(c);
                }
                if (iteration === 49) {
                    p.stroke(0, 0, 0);
                } else {
                    const fraction = Math.tanh(iteration / 20);
                    const col1 = p.color(0, 0, 50);
                    const col2 = p.color(255, 255, 255);
                    p.stroke(p.lerpColor(col1, col2, fraction));
                }
                p.point(x, y);
            }
        }
    };
};
