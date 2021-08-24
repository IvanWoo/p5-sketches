import type { Line } from "./api";

const dist = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};

const innerTangents = (
    x1: number,
    y1: number,
    r1: number,
    x2: number,
    y2: number,
    r2: number
) => {
    const hypotenuse = dist(x1, y1, x2, y2);
    const short = r1 + r2;

    const res: Line[] = [];
    for (const sign of [-1, 1]) {
        const phi =
            Math.atan2(y2 - y1, x2 - x1) +
            sign * (Math.asin(short / hypotenuse) - Math.PI / 2);
        const t1x = x1 + r1 * Math.cos(phi);
        const t1y = y1 + r1 * Math.sin(phi);
        const t2x = x2 + r2 * Math.cos(phi + Math.PI);
        const t2y = y2 + r2 * Math.sin(phi + Math.PI);
        res.push([t1x, t1y, t2x, t2y]);
    }
    return res;
};

const outerTangents = (
    x1: number,
    y1: number,
    r1: number,
    x2: number,
    y2: number,
    r2: number
) => {
    const hypotenuse = dist(x1, y1, x2, y2);
    const short = r1 - r2;

    const res: Line[] = [];
    for (const sign of [-1, 1]) {
        const phi =
            Math.atan2(y2 - y1, x2 - x1) + sign * Math.acos(short / hypotenuse);
        const t1x = x1 + r1 * Math.cos(phi);
        const t1y = y1 + r1 * Math.sin(phi);
        const t2x = x2 + r2 * Math.cos(phi);
        const t2y = y2 + r2 * Math.sin(phi);
        res.push([t1x, t1y, t2x, t2y]);
    }
    return res;
};

/**
 * Takes two circles and computes the inner and outer tangents
 *
 * Implementation based on: https://math.stackexchange.com/a/4048944
 */
export const tangents = (
    x1: number,
    y1: number,
    r1: number,
    x2: number,
    y2: number,
    r2: number
) => {
    const inner = innerTangents(x1, y1, r1, x2, y2, r2);
    const outer = outerTangents(x1, y1, r1, x2, y2, r2);
    return { inner, outer };
};
