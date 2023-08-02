import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import serve from "rollup-plugin-serve";
import replace from "@rollup/plugin-replace";


const dev = process.env.ROLLUP_WATCH;

const replaceOptions = dev ? {
    "process.env.ASSET_URL": JSON.stringify(process.env.ASSET_URL ? process.env.ASSET_URL : "http://localhost:4005/"),
} : {
    "process.env.ASSET_URL": JSON.stringify("https://raw.githubusercontent.com/kamilczerw/lovelace-vehicle-card/main/assets/"),

};

const serveOptions = {
    contentBase: ["./dist"],
    host: "0.0.0.0",
    port: 4000,
    allowCrossOrigin: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
};

const plugins = [
    typescript({
        declaration: false,
    }),
    nodeResolve(),
    json(),
    commonjs(),
    babel({
        babelHelpers: "bundled",
    }),
    replace(replaceOptions),
    ...(dev ? [serve(serveOptions)] : [terser()]),
];

export default [
    {
        input: "src/vehicle-cards.ts",
        output: {
            dir: "dist",
            format: "es",
            inlineDynamicImports: true,
        },
        plugins,
        moduleContext: (id) => {
            const thisAsWindowForModules = [
                "node_modules/@formatjs/intl-utils/lib/src/diff.js",
                "node_modules/@formatjs/intl-utils/lib/src/resolve-locale.js",
            ];
            if (thisAsWindowForModules.some((id_) => id.trimRight().endsWith(id_))) {
                return "window";
            }
        },
    },
];
