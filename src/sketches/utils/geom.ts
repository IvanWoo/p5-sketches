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
    let hypotenuse = dist(x1, y1, x2, y2);
    let short = r1 + r2;

    let res: Line[] = [];
    for (let sign of [-1, 1]) {
        let phi =
            Math.atan2(y2 - y1, x2 - x1) +
            sign * (Math.asin(short / hypotenuse) - Math.PI / 2);
        let t1x = x1 + r1 * Math.cos(phi);
        let t1y = y1 + r1 * Math.sin(phi);
        let t2x = x2 + r2 * Math.cos(phi + Math.PI);
        let t2y = y2 + r2 * Math.sin(phi + Math.PI);
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
    let hypotenuse = dist(x1, y1, x2, y2);
    let short = r1 - r2;

    let res: Line[] = [];
    for (let sign of [-1, 1]) {
        let phi =
            Math.atan2(y2 - y1, x2 - x1) + sign * Math.acos(short / hypotenuse);
        let t1x = x1 + r1 * Math.cos(phi);
        let t1y = y1 + r1 * Math.sin(phi);
        let t2x = x2 + r2 * Math.cos(phi);
        let t2y = y2 + r2 * Math.sin(phi);
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
    let inner = innerTangents(x1, y1, r1, x2, y2, r2);
    let outer = outerTangents(x1, y1, r1, x2, y2, r2);
    return { inner, outer };
};
