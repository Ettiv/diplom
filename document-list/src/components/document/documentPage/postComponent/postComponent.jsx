import React, { Component } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import '../../../../bootatrap.css';
import '../../../../App.css';

import PostsDataService from '../../../../api/posts/posts.js';
// import Spiner from '../../uiComponents/spiner/spiner';

export default class PostComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            id: +this.props.match.params.id,
            name: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        if (this.state.id === -1) {
            this.setState({
                loading: false
            })
            return
        }

        PostsDataService.retrivePost(this.state.id)
            .then(response => {
                this.setState({
                    name: response.data.name
                })
            });

        this.setState({
            loading: false
        })
    }

    onSubmit(values) {

        let post = {
            "id": this.state.id,
            "name": values.name
        }

        let newPost = {
            "name": values.name
        }

        if (this.state.id === -1) {
            PostsDataService.createPost(newPost).then(() => {
                this.props.history.push('/posts');
            });
        } else {
            PostsDataService.updatePost(this.state.id, post)
                .then(() => {
                    this.props.history.push('/posts');
                });
        }
    }


    validate(values) { // должен возвращать ошибку
        let errors = {};
        if (!values.name) {
            errors.name = 'Введите название поста';
        }

        return errors;
    }

    render() {

        return (
            <div>
                <h1>Пост</h1>
                <div className='container'>
                    <Formik initialValues={
                        {
                            name: this.state.name
                        }
                    }
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        enableReinitialize={true}>
                        {
                            (props) => (
                                <Form>
                                    <fieldset className='form-group'>
                                        <label>Название поста</label>
                                        <Field className='form-control'
                                            type='text'
                                            name='name' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='name'
                                        component='div'
                                        className='alert alert-danger' />

                                    <button type='submit' className='btn btn-success'>Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        );
    }
}

