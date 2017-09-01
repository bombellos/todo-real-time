/**
 * Created by mbaranowski on 6/30/17.
 */

import {ReduceStore} from 'flux/utils';
import TodoActionTypes from './TodoActionTypes';
import TodoDispatcher from './TodoDispatcher';


class UsersStore extends ReduceStore {
    constructor() {
        super(TodoDispatcher);
    }

    getInitialState() {
        return 0;
    }

    reduce(state, action) {

        switch (action.type) {
            case TodoActionTypes.ADD_USER_COUNT:
                return state+=1;

            case TodoActionTypes.SUBTRACT_USER_COUNT:
                return state-=1;

            default:
                return state;
        }
    }
}

export default new UsersStore();