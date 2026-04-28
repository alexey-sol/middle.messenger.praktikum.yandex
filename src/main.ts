import styles from "./main.module.scss";
import { compile } from "handlebars";
import "./style.css";

const testTemplate = compile(`
  <div class="{{containerClass}}">
    <h1 class="{{titleClass}}">{{message}}</h1>
  </div>
`);

const testHtml = testTemplate({
    containerClass: styles.container,
    message: "Hello from Vite + Handlebars!",
    titleClass: styles.title,
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<section>
  ${testHtml}
</section>
`;
