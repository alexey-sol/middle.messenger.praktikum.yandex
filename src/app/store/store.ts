import { type Block, type BlockOwnProps } from "../../shared/components/block";
import { cloneDeep, type Indexed, isEqual, merge, set } from "../../shared/utils/helpers";

type Listener = () => void;

class Store {
    private listeners: Set<Listener> = new Set();

    private state: Indexed = {};

    public getState() {
        return this.state;
    }

    public setState(path: string, value: unknown) {
        const currentStateCopy = cloneDeep(this.state);
        const newState = merge(currentStateCopy, set({}, path, value) as Indexed);

        if (!isEqual(this.state, newState)) {
            this.state = newState;

            this.emit();
        }
    }

    public subscribe(listener: Listener): () => void {
        this.listeners.add(listener);

        return () => {
            this.listeners.delete(listener);
        };
    }

    private emit() {
        this.listeners.forEach((listener) => listener());
    }
}

export const store = new Store();

export const connect = (mapStateToProps: (state: Indexed) => Indexed) => {
    return <P extends BlockOwnProps>(Component: typeof Block<P>) => {
        return class extends Component {
            get template(): string {
                return this.template ?? "";
            }

            constructor(props: P) {
                const state = cloneDeep(mapStateToProps(store.getState())) as P;

                super({ ...props, ...state });

                store.subscribe(() => {
                    const newState = cloneDeep(mapStateToProps(store.getState())) as P;

                    if (!isEqual(state as Indexed, newState as Indexed)) {
                        this.setProps({ ...newState });
                    }
                });
            }
        };
    };
};
