import type { BaseConfig, Config } from "./api";

import { readJSON } from "./io";

export let CONFIG: Config;

export const initConfig = (configPath: string) => {
    const conf = <BaseConfig>readJSON(configPath);
    CONFIG = {
        ...conf,
        assetURL: `${conf.assetURL}/assets`,
    };
};
