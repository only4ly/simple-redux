import { Action } from './Action';

const randomString = () =>
  Math.random()
    .toString(36)
    .substring(7)
    .split('')
    .join('.');

const initAction: Action = {
  type: `@@simple-redux/INIT_STATE_${randomString()}`,
  payload: null
};

export class Store {
  constructor(reducer: Function, preloadState?: any) {
    this.currentReducer = reducer;
    if (preloadState) {
      this.currentState = preloadState;
    } else {
      this.currentState = this.currentReducer(initAction);
    }
  }

  private currentState: any;
  private currentListeners: Function[];
  private currentReducer: Function;

  private notice() {
    this.currentListeners.forEach(listener => {
      listener(this.currentState);
    });
  }

  dispatch(action: Action) {
    this.currentState = this.currentReducer(action);
    this.notice();
  }

  subscribe(listener: Function) {
    this.currentListeners.push(listener);
    return () => this.unsubscribe(listener);
  }

  unsubscribe(listener: Function) {
    const index = this.currentListeners.findIndex(fn => fn === listener);
    if (index > -1) {
      this.currentListeners.splice(index, 1);
    }
  }

  getState(): any {
    return this.currentState;
  }

  // replaceReducer(nextReducer: Function) {}
}

export function createStore(reducer: Function, preloadState?: any) {
  return new Store(reducer, preloadState);
}
