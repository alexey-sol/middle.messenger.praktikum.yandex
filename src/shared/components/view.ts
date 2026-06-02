import { Block, type BlockOwnProps } from "./block";
import "@/shared/layouts/app.scss";

export abstract class View<P extends BlockOwnProps> extends Block<P> {}
