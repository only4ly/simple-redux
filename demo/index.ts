import { createStore, combineReducer } from '../index';
import { Action } from '../src/Action';

interface Todo {
  title: String;
  isFinished: Boolean;
}

const todoList = (state: Todo[] = [], action: Action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    default:
      return state;
  }
};

const store = createStore(todoList);

console.log(store.getState());

store.dispatch({
  type: 'ADD',
  payload: { title: 'hello redux', isFinished: false }
});

console.log(store.getState());
