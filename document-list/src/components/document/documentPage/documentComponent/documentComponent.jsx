import React, { Component } from 'react';
import moment from 'moment';
import { ErrorMessage,Field, Form, Formik } from 'formik';


import CustomSelect from '../customSelect/customSelect';

import '../../../../bootatrap.css';

import todoDataService from '../../../../api/documet/documentDataService.js';
// import Spiner from '../../uiComponents/spiner/spiner';

export default class DocumentComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            id: +this.props.match.params.id,
            doc_name: '',
            doc_body: '',
            doc_note: '',
            doc_number: '',
            doc_register_date: moment(new Date()).format('YYYY-MM-DD'),
            doc_dispatch_date: moment(new Date()).format('YYYY-MM-DD'),
            users: [],
            vids: [],
            types: [],
            organisations: []
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        todoDataService.retriveAllUsers()
            .then(response => {
                let users = [
                    {
                        "value": null,
                        "label": "..."
                    }
                ];
                response.data.forEach(user => {
                    users.push({
                        "value": user.id,
                        "label": user.fio_emp
                    })
                });
                this.setState({
                    users
                })
            });

        todoDataService.retriveAllVids()
            .then(response => {
                let vids = [
                    {
                        "value": null,
                        "label": "..."
                    }
                ];
                response.data.forEach(vid => {
                    vids.push({
                        "value": vid.id,
                        "label": vid.vid_name
                    })
                });
                this.setState({
                    vids
                })
            });

        todoDataService.retriveAllTypes()
            .then(response => {
                let types = [
                    {
                        "value": null,
                        "label": "..."
                    }
                ];
                response.data.forEach(type => {
                    types.push({
                        "value": type.id,
                        "label": type.typ_name
                    })
                });
                this.setState({
                    types
                })
            });

        todoDataService.retriveAllOrganisations()
            .then(response => {
                let organisations = [
                    {
                        "value": null,
                        "label": "..."
                    }
                ];
                response.data.forEach(organisation => {
                    organisations.push({
                        "value": organisation.id,
                        "label": organisation.org_name
                    })
                });
                this.setState({
                    organisations
                })
            });

        if (this.state.id === -1) {
            this.setState({
                loading: false
            })
            return
        }

        todoDataService.retriveDocument(this.state.id)
            .then(response => {
                this.setState({
                    doc_name: response.data.doc_name,
                    doc_body: response.data.doc_body,
                    doc_note: response.data.doc_note,
                    doc_number: response.data.doc_number,
                    doc_register_date: moment(response.data.doc_register_date).format('YYYY-MM-DD'),
                    doc_dispatch_date: moment(response.data.doc_dispatch_date).format('YYYY-MM-DD')
                });
            });

        this.setState({
            loading: false
        })
    }

    onSubmit(values) {

        let document = {
            "id": this.state.id,
            "doc_body": values.doc_body,
            "vid_doc_id": values.vids,
            "typ_doc_id": values.types,
            "org_id": values.organisations,
            "use_id": values.users,
            "doc_number": values.doc_number,
            "doc_name": values.doc_name,
            "doc_register_date": values.doc_register_date,
            "doc_dispatch_date": values.doc_dispatch_date,
            "doc_note": values.doc_note
        }

        let newDocument = {
            "vid_doc_id": values.vids,
            "typ_doc_id": values.types,
            "org_id": values.organisations,
            "use_id": values.users,
            "doc_number": values.doc_number,
            "doc_name": values.doc_name,
            "doc_register_date": values.doc_register_date,
            "doc_dispatch_date": values.doc_dispatch_date,
            "doc_body": values.doc_body,
            "doc_note": values.doc_note
        }

        if (this.state.id === -1) {
            todoDataService.createDocument(newDocument).then(() => {
                this.props.history.push('/documents');
            });
        } else {
            todoDataService.updateDocument(this.state.id, document)
                .then(() => {
                    this.props.history.push('/documents');
                });
        }
    }


    validate(values) { // должен возвращать ошибку
        let errors = {};
        if (!values.doc_name) {
            errors.doc_name = 'Введите название документа';
        } else if (values.doc_name.length < 5) {
            errors.doc_name = 'Минимум 5 букв в названии';
        }

        if (!values.doc_body) {
            errors.doc_body = 'Введите текст документа'
        }

        if (!values.doc_note) {
            errors.doc_note = 'Введите заметку документа'
        }

        if (!values.doc_number) {
            errors.doc_number = 'Введите номер документа'
        }

        if (!moment(values.doc_register_date).isValid()) {
            errors.doc_register_date = 'Введите дату регистрации документа';
        }

        if (!moment(values.doc_dispatch_date).isValid()) {
            errors.doc_dispatch_date = 'Введите дату отправки документа';
        }

        if(!values.users){
            errors.users = 'Выберете составителя';
        }

        if(!values.vids){
            errors.vids = 'Выберете вид документа';
        }

        if(!values.types){
            errors.types = 'Выберете тип документа';
        }

        if(!values.organisations){
            errors.organisations = 'Выберете Организацию';
        }

        return errors;
    }

    render() {

        return (
            <div>
                <h1>Todo</h1>
                <div className='container'>
                    <Formik initialValues={
                        {
                            doc_name: this.state.doc_name,
                            doc_body: this.state.doc_body,
                            doc_note: this.state.doc_note,
                            doc_register_date: this.state.doc_register_date,
                            doc_dispatch_date: this.state.doc_dispatch_date,
                            doc_number: this.state.doc_number,
                            users: '',
                            vids: '',
                            types: '',
                            organisations: ''
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
                                        <label>Номер документа</label>
                                        <Field className='form-control'
                                            type='text'
                                            name='doc_number' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='doc_number'
                                        component='div'
                                        className='alert alert-warning' />

                                    <fieldset className='form-group'>
                                        <label>Название документа</label>
                                        <Field className='form-control'
                                            type='text'
                                            name='doc_name' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='doc_name'
                                        component='div'
                                        className='alert alert-warning' />

                                    <fieldset className='form-group'>
                                        <label>Описание</label>
                                        <Field className='form-control'
                                            type='text'
                                            name='doc_body' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='doc_body'
                                        component='div'
                                        className='alert alert-warning' />

                                    <fieldset className='form-group'>
                                        <label>Примечание</label>
                                        <Field className='form-control'
                                            type='text'
                                            name='doc_note' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='doc_note'
                                        component='div'
                                        className='alert alert-warning' />
                                    <fieldset className='form-group'>

                                        <label>Дата создания</label>
                                        <Field className='form-control'
                                            type='date'
                                            name='doc_register_date' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='doc_register_date'
                                        component='div'
                                        className='alert alert-warning' />

                                    <fieldset className='form-group'>
                                        <label>Дата отправки</label>
                                        <Field className='form-control'
                                            type='date'
                                            name='doc_dispatch_date' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='doc_dispatch_date'
                                        component='div'
                                        className='alert alert-warning' />

                                    <fieldset className='form-group'>
                                        <label >Составитель</label>
                                        <CustomSelect
                                            options={this.state.users}
                                            name='users' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='users'
                                        component='div'
                                        className='alert alert-warning' />

                                    <fieldset className='form-group'>
                                        <label>Вид документа</label>
                                        <CustomSelect
                                            options={this.state.vids}
                                            name='vids' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='vids'
                                        component='div'
                                        className='alert alert-warning' />

                                    <fieldset className='form-group'>
                                        <label>Тип документа</label>
                                        <CustomSelect
                                            options={this.state.types}
                                            name='types' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='types'
                                        component='div'
                                        className='alert alert-warning' />
                                    
                                    <fieldset className='form-group'>
                                        <label>Организация</label>
                                        <CustomSelect
                                            options={this.state.organisations}
                                            name='organisations' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='organisations'
                                        component='div'
                                        className='alert alert-warning' />

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

