import { globSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

const PARTIAL_DIRECTORIES = globSync("src/**/shared/layouts")

export default defineConfig({
    appType: "mpa",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                chat: resolve(__dirname, "src", "chat", "views", "pages", "chat.html"),
                "profile-main": resolve(__dirname, "src", "profile", "views", "pages", "profile-main.html"),
                "profile-edit": resolve(__dirname, "src", "profile", "views", "pages", "profile-edit.html"),
                "password-edit": resolve(__dirname, "src", "profile", "views", "pages", "password-edit.html"),
                "sign-in": resolve(__dirname, "src", "auth", "views", "pages", "sign-in.html"),
                "sign-up": resolve(__dirname, "src", "auth", "views", "pages", "sign-up.html"),
                "404": resolve(__dirname, "src", "error", "views", "pages", "404.html"),
                "500": resolve(__dirname, "src", "error", "views", "pages", "500.html"),
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
