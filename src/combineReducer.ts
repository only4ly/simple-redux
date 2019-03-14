import { Action } from './Action';

export function combineReducer(reducers: Object) {
  return function(action: Action) {
    const keys = Object.keys(reducers);
    const state = {};

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const reducer = reducers[key];
      if (typeof reducer === 'function') {
        state[key] = reducer(action);
      } else {
        throw 'reducer must be a function';
      }
    }
    return Object.keys(reducers).reduce(
      (state, key) => ({ ...state, [key]: reducers[key](action) }),
      {}
    );
  };
}
