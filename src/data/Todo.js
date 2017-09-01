/**
 * Created by mbaranowski on 6/30/17.
 */

import Immutable from 'immutable';

const Todo = Immutable.Record({
    id:0,
    complete: false,
    text: '',
});

export default Todo;