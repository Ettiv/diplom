import React, { Component } from 'react';

import PostsDataService from '../../../../api/posts/posts.js';
import '../../../../bootatrap.css';

export default class PostsListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null
        }
        this.deletePostClicked = this.deletePostClicked.bind(this);
        this.updatePostClicked = this.updatePostClicked.bind(this);
        this.addPostClicked = this.addPostClicked.bind(this);
    }

    componentDidMount() {
        this.props.refreshPosts();
    }

    deletePostClicked(id) {
        PostsDataService.deletePost(id)
            .then(
                response => {
                    this.setState({
                        message: `Delete of Post ${id} is sucsessful`
                    });
                    this.props.refreshPosts();
                }
            )
    }

    updatePostClicked(id) {
        this.props.history.push(`/posts/${id}`);
    }

    addPostClicked() {
        this.props.history.push(`/posts/-1`);
    }

    render() {

        const vieu =
        <div>
                <div>
                    <div>
                        <h1>Посты</h1>
                        {this.state.message ? <div className='alert alert-success'>{this.state.message}</div> : null}
                        <div className='container'>

                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Название поста</th>
                                        <th>Изменить</th>
                                        <th>Удалить</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.posts.map(post => {
                                        return (
                                            <tr key={post.id}>
                                                <td>{post.name}</td>                                              
                                                <td><button
                                                    className='btn btn-warning'
                                                    onClick={() => this.updatePostClicked(post.id)}>
                                                    Изменить
                                                </button>
                                                </td>
                                                <td><button
                                                    className='btn btn-danger'
                                                    onClick={() => this.deletePostClicked(post.id)}>
                                                    Удалить
                                                </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            const nothing = 
            <div>
                Ничего не найдено
            </div>


        return (
            <div  className='row'>
                <div className='col-4' />
                <div  className='col-4' >
                    {this.props.posts.length ? vieu : nothing}
                </div>
                <div className='col-4' >
                    <div className='container'>
                        <br /><br /><br /><br /><br />
                        <button
                            className='btn btn-success'
                            onClick={this.addPostClicked}>
                            Добавить
                            </button>
                    </div>
                </div>
            </div>
            
        )
    }
}