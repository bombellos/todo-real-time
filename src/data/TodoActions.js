/**
 * Created by mbaranowski on 6/30/17.
 */

import TodoActionTypes from './TodoActionTypes';
import TodoDispatcher from './TodoDispatcher';
import TodoAPI from './TodoAPI';
import firebase from 'firebase';

const Actions = {

    loaderOn() {
        TodoDispatcher.dispatch({
            type: TodoActionTypes.LOADER_ON,
        });
    },

    loaderOff() {
        TodoDispatcher.dispatch({
            type: TodoActionTypes.LOADER_OFF,
        });
    },

    loadTodos() {
        Actions.loaderOn();
        firebase.database().ref('/todos').on('value', function (todos) {
            setTimeout(() => {
                TodoDispatcher.dispatch({
                    type: TodoActionTypes.LOAD_TODOS,
                    todos: todos.val(),
                });

                Actions.loaderOff();
            }, 0);

        });
    },

    addTodo(text) {
        if(!text)
            return;
        Actions.loaderOn();
        const id = TodoAPI.getNewId();
        TodoAPI.addTodo(id, text).then(Actions.loaderOff);
    },

    deleteTodo(id) {
        Actions.loaderOn();
        TodoAPI.deleteTodo(id)
            .then(() => {
                TodoDispatcher.dispatch({
                    type: TodoActionTypes.DELETE_TODO,
                    id,
                });
                Actions.loaderOff();
            });
    },

    toggleTodo(id) {
        Actions.loaderOn();
        TodoAPI.toggleTodo(id)
            .then(() => {
                TodoDispatcher.dispatch({
                    type: TodoActionTypes.TOGGLE_TODO,
                    id,
                });
                Actions.loaderOff();
            });
    },

    deleteCompletedTodos() {
        Actions.loaderOn();
        TodoAPI.deleteCompletedTodos()
            .then(() => {
                TodoDispatcher.dispatch({
                    type: TodoActionTypes.DELETE_COMPLETED
                });
                Actions.loaderOff();
            });
    },

    toggleAllTodos() {
        Actions.loaderOn();
        TodoAPI.toggleAllTodos().then(Actions.loaderOff);
    }
};

export default Actions;