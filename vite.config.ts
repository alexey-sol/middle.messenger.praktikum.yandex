import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

// FIXME tests
export default defineConfig({
    // test: {
    //   environment: 'jsdom', // Essential for testing DOM manipulations
    //   globals: true,
    // },
    css: {
        modules: {
            generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
    },
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, "src/partials"),
        }),
    ],
    server: {
        port: 3000,
    },
});
