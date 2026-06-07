import { globSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

const PARTIAL_DIRECTORIES = globSync("src/**/shared/layouts")

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
            },
        },
    },
    css: {
        modules: {
            generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
    },
    assetsInclude: ["**/*.hbs"],
    plugins: [
        handlebars({
            partialDirectory: PARTIAL_DIRECTORIES,
        }),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
});
