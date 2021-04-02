import React, { Component } from 'react';

export default class ListTodosComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {
                    id: 1,
                    description: 'Learn React',
                    done: false,
                    targetDate: new Date()
                },
                {
                    id: 2,
                    description: 'Learn to dance',
                    done: false,
                    targetDate: new Date()
                },
                {
                    id: 3,
                    description: 'come to Japan',
                    done: false,
                    targetDate: new Date()
                }
            ]
        }
    }

    render() {

        return (
            <div>
                <h1>List Todos</h1>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>description</th>
                            <th>Target date</th>
                            <th>Done</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.todos.map(todo => {
                            return (
                                <tr>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}