/**
 * Created by mbaranowski on 6/30/17.
 */

import {ReduceStore} from 'flux/utils';
import TodoActionTypes from './TodoActionTypes';
import TodoDispatcher from './TodoDispatcher';


class LoaderStore extends ReduceStore {
    constructor() {
        super(TodoDispatcher);
    }

    getInitialState() {
        return false;
    }

    reduce(state, action) {

        switch (action.type) {
            case TodoActionTypes.LOADER_ON:
                return true;

            case TodoActionTypes.LOADER_OFF:
                return false;

            default:
                return state;
        }
    }
}

export default new LoaderStore();