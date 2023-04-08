import { SKETCH_BARREL_FILE, readText } from "./io";

export function getAllSketches(): string[] {
    const sketchBarrelFileContents = readText(SKETCH_BARREL_FILE);
    const regex = /as\s+(\w+)\s+/g;
    const matches = sketchBarrelFileContents.matchAll(regex);
    const names = [...matches].map(match => match[1]);
    return names;
}
