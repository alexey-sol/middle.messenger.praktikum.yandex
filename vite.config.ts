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
                "sign-in": resolve(__dirname, 'src', 'auth', 'views', 'sign-in.html'),
                "sign-up": resolve(__dirname, 'src', 'auth', 'views', 'sign-up.html'),
                "404": resolve(__dirname, 'src', 'error', 'views', '404.html'),
                "500": resolve(__dirname, 'src', 'error', 'views', '500.html'),
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
