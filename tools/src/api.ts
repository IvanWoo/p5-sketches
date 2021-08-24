import type { IObjectOf } from "@thi.ng/api";

export interface BaseConfig {
    assetURL: string;
    sketches: Sketch[];
}

export type Config = BaseConfig

export interface Sketch extends IObjectOf<string> {
    name: string;
    screenshot: string;
    description: string;
    references: string;
}
