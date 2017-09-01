/**
 * Created by mbaranowski on 6/30/17.
 */

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import TodoActionTypes from './TodoActionTypes';
import TodoDispatcher from './TodoDispatcher';
import Todo from './Todo';


class TodoStore extends ReduceStore {
    constructor() {
        super(TodoDispatcher);
    }

    getInitialState() {
        return Immutable.OrderedMap();
    }

    reduce(state, action) {

        switch (action.type) {
            case TodoActionTypes.LOAD_TODOS:

                let todosMap = this.getInitialState();

                for (let key in action.todos) {
                    todosMap = todosMap.set(action.todos[key].id, new Todo({
                        id: action.todos[key].id,
                        text: action.todos[key].text,
                        complete: action.todos[key].complete,
                    }));
                }
                return todosMap;

            case TodoActionTypes.DELETE_TODO:
                return state.delete(action.id);

            case TodoActionTypes.DELETE_COMPLETED:
                return state.filter((todo) => !todo.complete);

            case TodoActionTypes.TOGGLE_ALL:
                const allCompleted = state.every(todo => todo.complete);
                return state.map(todo => todo.set('complete', !allCompleted));

            default:
                return state;
        }
    }
}

export default new TodoStore();