/**
 * Created by mbaranowski on 6/30/17.
 */
import React, {Component} from 'react';
import '../assets/base.css';
import '../assets/style.css';


function AppView(props) {

    return (
        <div>
            <Header {...props} />
            <Main {...props} />
            <Footer {...props} />
        </div>
    );
}


function Header(props) {
    return (
        <header id="header">
            <h1>todos</h1>
            <input type="text"
                   id="new-todo"
                   onKeyDown={(event) => {
                       if (event.keyCode === 13) {
                           props.onAddTodo(event.target.value);
                           event.target.value = '';
                       } else {
                           return null
                       }
                   }
                   }

                   placeholder="I need to..."
            />
            {
                props.isLoading ?
                    <div className="loader"></div>
                    :
                    null
            }

        </header>
    );
}


class Main extends Component {

    componentDidMount() {
        this.props.loadTodos(true);
    }


    render() {
        if (this.props.todos.size === 0) {
            return null;
        }
        return (
            <section id="main">
                <input id="toggle-all"
                       type="checkbox"
                       onClick={() => this.props.onToggleAllTodo()}
                />
                <ul id="todo-list">
                    {console.log([...this.props.todos.values()])}
                    {[...this.props.todos.values()].reverse().map(todo => (
                        <li key={todo.id}>
                            <div className="view">
                                <input
                                    className="toggle"
                                    type="checkbox"
                                    checked={todo.complete}
                                    onChange={() => this.props.onToggleTodo(todo.id)}
                                />
                                <label>{todo.text}</label>
                                <button
                                    className="destroy"
                                    onClick={() => this.props.onDeleteTodo(todo.id)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        );
    }

}

function Footer(props) {
    if (props.todos.size === 0) {
        return null;
    }

    const remaining = props.todos.filter(todo => !todo.complete).size;
    const phrase = remaining === 1 ? ' item left' : ' items left';
    const completed = props.todos.filter(todo => todo.complete).size;

    let clearCompletedButton = null;
    if (completed > 0) {
        clearCompletedButton =
            <button
                id="clear-completed"
                onClick={props.onDeleteCompleted}>
                Clear completed ({completed})
            </button>
    }

    return (
        <footer id="footer">
      <span id="todo-count">
        <strong>
          {remaining}
        </strong>
          {phrase}
      </span>
            {clearCompletedButton}
        </footer>
    );
}


export default AppView;

