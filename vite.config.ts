import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
    appType: 'mpa',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                chat: resolve(__dirname, 'src', 'chat', 'views', 'chat.html'),
                "profile-main": resolve(__dirname, 'src', 'profile', 'views', 'profile-main.html'),
                "profile-edit": resolve(__dirname, 'src', 'profile', 'views', 'profile-edit.html'),
                "password-edit": resolve(__dirname, 'src', 'profile', 'views', 'password-edit.html'),
            },
        },
    },
    css: {
        modules: {
            generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
    },
    assetsInclude: ['**/*.hbs'],
    plugins: [
        handlebars(),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
    server: {
        port: 3000,
    },
});
