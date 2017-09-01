/**
 * Created by mbaranowski on 7/1/17.
 */


import firebase from 'firebase';
import TodoStore from './TodoStore';


export default class TodoAPI {

    static fbXHR(path, method, data) {
        return firebase.database().ref(path)[method](data);
    }

    static getNewId() {
        return firebase.database().ref('/todos/').push().key
    }

    static addTodo(id, text) {
        if (!text)
            return;

        return this.fbXHR('/todos/' + id, "set", {
            id,
            text,
            complete: false
        });
    }

    static deleteTodo(id) {
        if (!id)
            return;
        return this.fbXHR('/todos/' + id, "remove");
    }

    static toggleTodo(id) {
        if (!id)
            return;

        const state = TodoStore.getState();

        return this.fbXHR('/todos/' + id, "update", {
            complete: !state.getIn([id, 'complete'])
        });
    }

    static toggleAllTodos() {
        const state = TodoStore.getState();
        const allCompleted = state.every(todo => todo.complete);
        const todos = {};

        state.filter((todo, key) => {
            return todos[key + '/complete'] = !allCompleted;
        });

        return this.fbXHR('/todos/', 'update', todos);
    }

    static deleteCompletedTodos() {
        const completedTodos = {};

        TodoStore.getState().filter((todo, key) => {
            return todo.complete ? completedTodos[key] = null : todo;
        });

        return this.fbXHR('/todos/', 'update', completedTodos);
    }

};