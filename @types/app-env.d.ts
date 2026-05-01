declare module "*.css";

declare module "*.scss";

declare module "*.module.scss";

declare module "*.hbs?raw";

declare module "*.svg" {
    const svg: string;
    export default svg;
}

declare module "*.jpg" {
    const jpg: string;
    export default jpg;
}

declare module "*.png" {
    const png: string;
    export default png;
}
