const process = require("process");
const path = require("path");
const fs = require("fs");

const pathOf = name => path.join(__dirname, "..", name);
const sketchPath = name => path.join(pathOf("src/sketches"), name);
const sketchBarrelPath = pathOf("src/sketches/index.ts");
const dummySketchPath = pathOf("src/sketch.ts");

const sketchTemplate = `import type p5 from "p5";
import { range } from "@thi.ng/iterators";

export const sketch = (p: p5) => {
    const width = 800;
    const height = 600;

    p.setup = () => {
        p.createCanvas(width, height);
        p.background("white");
        p.noLoop();
    };

    p.draw = () => {

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
    if (!process.argv[3]) {
        console.log("no sketch name!");
        return;
    }

    const name = process.argv[3];
    if (name.match(/^\d/)) {
        console.log(`invalid name: ${name}`);
        return;
    }
    write(name);
};

main();
