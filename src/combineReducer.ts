import { Action } from './Action';

export function combineReducer(reducers: Object) {
  return function(currentState: any, action: Action) {
    const keys = Object.keys(reducers);
    const newState = {};

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const reducer = reducers[key];
      if (typeof reducer === 'function') {
        newState[key] = reducer(currentState[key], action);
      } else {
        throw 'reducer must be a function';
      }
    }

    return newState;
  };
}
