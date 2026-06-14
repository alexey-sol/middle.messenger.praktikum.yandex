import { type BlockConstructor, type BlockOwnProps } from "../shared/components/block";
import { type View } from "../shared/components/view";
import { AuthController } from "@/auth/api";

type IRoute = {
    leave: () => void;
    match: (pathname: string) => boolean;
    options: null | RouteOptions;
    render: () => void;
};

type RouteOptions = {
    redirectPath?: string;
    type?: "guest" | "private";
};

class Route<P extends BlockOwnProps> implements IRoute {
    public options: null | RouteOptions;

    private block: null | View<P>;

    private blockClass: BlockConstructor<P>;

    private pathname: string;

    private props: P;

    constructor(
        pathname: string,
        view: BlockConstructor<P>,
        props: P,
        options: null | RouteOptions = null,
    ) {
        this.pathname = pathname;
        this.blockClass = view;
        this.block = null;
        this.props = props;
        this.options = options;
    }

    leave() {
        if (this.block) {
            this.block.hide();
        }
    }

    match(pathname: string) {
        return pathname === this.pathname;
    }

    render() {
        if (!this.block) {
            this.block = new this.blockClass(this.props) as View<{}>;
            this.block?.show();
            return;
        }

        this.block.show();
    }
}

const ROOT_ROUTE = "/";

class Router {
    static __instance: null | Router;

    public routes: IRoute[];

    private currentRoute: IRoute | null;

    private history: History;

    private constructor(history: History) {
        this.history = history;
        this.routes = [];
        this.history = window.history;
        this.currentRoute = null;
    }

    public static getInstance(history = window.history): Router {
        if (!Router.__instance) {
            // eslint-disable-next-line canonical/id-match
            Router.__instance = new Router(history);
        }

        return Router.__instance;
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            return;
        }

        const { options } = route;
        const { redirectPath, type } = options ?? {};

        if (type && redirectPath) {
            AuthController.getUser().then((user) => {
                if (type === "guest" && user && route.match(ROOT_ROUTE)) {
                    this.go(redirectPath);
                } else if (type === "private" && !user) {
                    this.go(redirectPath);
                }
            });
        }

        if (this.currentRoute) {
            this.currentRoute.leave();
        }

        this.currentRoute = route;
        route.render();
    }

    back() {
        this.history.go(-1);
    }

    forward() {
        this.history.go(1);
    }

    getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }

    go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    start() {
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    use<P extends BlockOwnProps>(pathname: string, viewConstructor: BlockConstructor<P>, props: P) {
        const route = new Route(pathname, viewConstructor, props);

        this.routes.push(route);

        return this;
    }

    useGuest<P extends BlockOwnProps>(
        pathname: string,
        viewConstructor: BlockConstructor<P>,
        props: P,
        redirectPath = ROOT_ROUTE,
    ) {
        const route = new Route(pathname, viewConstructor, props, {
            redirectPath,
            type: "guest",
        });

        this.routes.push(route);

        return this;
    }

    usePrivate<P extends BlockOwnProps>(
        pathname: string,
        viewConstructor: BlockConstructor<P>,
        props: P,
        redirectPath = ROOT_ROUTE,
    ) {
        const route = new Route(pathname, viewConstructor, props, {
            redirectPath,
            type: "private",
        });

        this.routes.push(route);

        return this;
    }
}

export const router = Router.getInstance();
