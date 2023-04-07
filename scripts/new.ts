import dateFormat from "dateformat";
import * as fs from "fs";
import * as path from "path";
import * as process from "process";

const pathOf = (name: string): string => path.join(__dirname, "..", name);
const sketchPath = (name: string): string =>
    path.join(pathOf("src/sketches"), name);
const sketchBarrelPath = pathOf("src/sketches/index.ts");
const dummySketchPath = pathOf("src/sketch.ts");

const sketchTemplate = `import type p5 from "p5";

import * as tx from "@thi.ng/transducers";

export const sketch = (p: p5) => {
    const width = 800;
    const height = width;
    const bgCol = "white";

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(bgCol);
        p.noLoop();
    };

    p.draw = () => {

    };

    p.keyReleased = () => {
        if (p.key === "s") p.saveCanvas("sketchScreenshot", "png");
    };
};

`;

const write = (name: string): void => {
    const newSketchPath = sketchPath(`${name}.ts`);
    console.log(`created new sketch at: ${newSketchPath}`);
    fs.writeFileSync(newSketchPath, sketchTemplate);

    console.log(`updated barrel at: ${sketchBarrelPath}`);
    fs.appendFileSync(
        sketchBarrelPath,
        `export { sketch as ${name} } from "./${name}";\n`
    );

    console.log(`set the working sketch at: ${dummySketchPath}`);
    fs.writeFileSync(
        dummySketchPath,
        `export { ${name} as sketch } from "./sketches";\n`
    );
};

const main = async (): Promise<void> => {
    let name = process.argv[2];
    if (!name) {
        const now = new Date();
        const dateStr = dateFormat(now, "yymmdd");
        name = `yifan${dateStr}`;
    }

    if (name.match(/^\d/)) {
        console.log(`invalid name: ${name}`);
        return;
    }
    write(name);
};

main();
