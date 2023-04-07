import { readFileSync } from "fs";
import * as path from "path";

export const readJSON = (path: string) => JSON.parse(<any>readFileSync(path));

export const readText = (path: string) => readFileSync(path).toString();

const REPO_DIR = path.join(__dirname, "../../");
const SKETCHES_DIR = path.join(REPO_DIR, "src/sketches");

export const sketchPath = (name: string): string =>
    path.join(SKETCHES_DIR, name);
export const SKETCH_BARREL_FILE = sketchPath("index.ts");
export const DUMMY_SKETCH_FILE = path.join(REPO_DIR, "src/sketch.ts");
