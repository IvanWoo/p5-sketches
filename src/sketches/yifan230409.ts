import type p5 from "p5";

import {
    random2d,
    spiral2d,
    interleaveColumns2d,
    diagonal2d,
    hilbert2d,
} from "@thi.ng/grid-iterators";
import { cycle } from "@thi.ng/iterators";
import * as tx from "@thi.ng/transducers";

// magick refs/FtEX34kX0AEjSbd.png -colors 10 -unique-colors txt: | grep -Eo '#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})'
const palette = [
    "#161616",
    "#505464",
    "#F04537",
    "#0B815E",
    "#F6C21D",
    "#4A54AD",
    "#F197A3",
    "#FFA9DA",
    "#FDF7E2",
];

export const sketch = (p: p5) => {
    const width = 800;
    const height = width;
    const padding = 50;
    const NB = 20;
    const baseUnit = Math.ceil((width - 2 * padding) / NB);
    const rectSize = baseUnit;
    const colors = cycle(palette.slice(0, palette.length - 1));
    const buckets = cycle(random2d(NB));
    const steps = 100;
    const offsetMax = 1;
    const enablePath = 0;
    const bgColor = palette[palette.length - 1];
    const baseStrokeWight = 3;

    const drawHatching = (
        x0: number,
        y0: number,
        w = 300,
        h = 300,
        degree = 45,
        strokeColHex = "#161616",
        strokeColAlpha = 200
    ) => {
        const strokeCol = p.color(strokeColHex);
        strokeCol.setAlpha(strokeColAlpha);
        p.stroke(strokeCol);
        const spacing = 10;
        const angle = p.radians(degree);
        const diameter = 0.1;
        for (let x = x0; x < x0 + h; x += spacing) {
            for (let y = y0; y < y0 + w; y += spacing) {
                const dx = spacing * p.cos(angle) + p.random() * 2;
                const dy = spacing * p.sin(angle) + p.random() * 2;
                p.strokeWeight(baseStrokeWight);
                p.line(x, y, x + dx, y + dy);
                // p.line(x - 3, y - 3, x + 3, y + 3);
                // p.line(x + 3, y - 3, x - 3, y + 3);
                p.strokeWeight(baseStrokeWight * 1.1);
                const offset = p.random() * 2;
                p.ellipse(x + dx - offset, y + dy - offset, diameter, diameter);
            }
        }
        p.noStroke();
    };

    const serializeTuple = (x: number, y: number) => {
        return `(${x}, ${y})`;
    };

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(bgColor);
        // p.noLoop();
        p.frameRate(1);
    };

    p.draw = () => {
        p.noStroke();
        p.background(bgColor);
        p.translate(padding, padding);
        const visited = new Set();
        for (let step = 0; step < steps; step++) {
            const b = buckets.next();
            const [x, y] = <number[]>b.value;
            let color;
            for (let step = 0; step < p.random(1, offsetMax); step++) {
                color = colors.next();
            }
            const col = p.color(color.value as string);
            // col.setAlpha(p.random(100, 150));
            const expand = p.random([...tx.range(1, 4)]);
            p.fill(col);
            let path = [...spiral2d(expand)];
            if (enablePath) {
                path = path.slice(0, p.random([...tx.range(3, path.length)]));
            }
            const degree = p.random([...tx.range(0, 90)]);
            for (const [dx, dy] of path) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= NB || ny >= NB) {
                    continue;
                }
                const tuple = serializeTuple(nx, ny);
                if (visited.has(tuple)) {
                    continue;
                }
                visited.add(tuple);
                const x0 = nx * baseUnit;
                const y0 = ny * baseUnit;
                // p.rect(x0, y0, rectSize, rectSize);
                drawHatching(
                    x0,
                    y0,
                    rectSize,
                    rectSize,
                    degree,
                    color.value,
                    200
                );
            }
        }
    };

    p.keyReleased = () => {
        if (p.key === "s") p.saveCanvas("sketchScreenshot", "png");
    };
};
