const process = require("process");
const path = require("path");
const fs = require("fs");
const dateFormat = require("dateformat");

const pathOf = name => path.join(__dirname, "..", name);
const sketchPath = name => path.join(pathOf("src/sketches"), name);
const sketchBarrelPath = pathOf("src/sketches/index.ts");
const dummySketchPath = pathOf("src/sketch.ts");

const sketchTemplate = `import type p5 from "p5";

import { range } from "@thi.ng/transducers";

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

const write = name => {
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

const main = async () => {
    let name = process.argv[3];
    if (!process.argv[3]) {
        let now = new Date();
        let dateStr = dateFormat(now, "yymmdd");
        name = `yifan${dateStr}`;
    }

    if (name.match(/^\d/)) {
        console.log(`invalid name: ${name}`);
        return;
    }
    write(name);
};

main();
