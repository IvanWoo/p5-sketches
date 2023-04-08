import * as fs from "fs";
import * as process from "process";

import { getAllSketches } from "./db";
import { DUMMY_SKETCH_FILE } from "./io";

const write = (name: string): void => {
    // TODO: duplicate code in new-sketch.ts, abstract it into utils
    console.log(`set the working sketch at: ${DUMMY_SKETCH_FILE}`);
    fs.writeFileSync(
        DUMMY_SKETCH_FILE,
        `export { ${name} as sketch } from "./sketches";\n`
    );
};

const allSketches = getAllSketches();

const help = () => {
    console.log("all existing sketches:");
    console.log(allSketches);
};

const main = async (): Promise<void> => {
    const name = process.argv[2];
    if (!name) {
        console.error("name cannot be empty");
        help();
        return;
    }
    if (!allSketches.includes(name)) {
        console.error(`non exist name: ${name}`);
        help();
        return;
    }
    write(name);
};

main();
