/**
 * Created by mbaranowski on 6/30/17.
 */
import AppView from '../views/AppView';
import {Container} from 'flux/utils';
import TodoStore from '../data/TodoStore';
import TodoActions from '../data/TodoActions';
import LoaderStore from '../data/LoaderStore';

function getStores() {
    return [
        TodoStore, LoaderStore
    ];
}

function getState() {
    return {
        loadTodos: TodoActions.loadTodos,

        todos: TodoStore.getState(),

        onAddTodo: TodoActions.addTodo,
        onDeleteTodo: TodoActions.deleteTodo,
        onToggleTodo: TodoActions.toggleTodo,
        onToggleAllTodo: TodoActions.toggleAllTodos,
        onDeleteCompleted: TodoActions.deleteCompletedTodos,

        isLoading: LoaderStore.getState(),
    };
}

export default Container.createFunctional(AppView, getStores, getState);