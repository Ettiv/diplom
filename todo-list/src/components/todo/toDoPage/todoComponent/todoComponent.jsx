import React, { Component } from 'react';
import moment from 'moment';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Select from 'react-select';

import '../../../../bootatrap.css';

import todoDataService from '../../../../api/documet/documentDataService.js';
import AuthentificationService from '../../../../services/authentication.js';

export default class TodoComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
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
        //this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        let users = todoDataService.retriveAllFio(),
            vids = todoDataService.retriveAllVidsName(),
            types = todoDataService.retriveAllTypesName(),
            organisations = todoDataService.retriveAllOrganisationsName();

        this.setState({
            users,
            vids ,
            types,
            organisations
        })

        if (this.state.id === -1) {
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
    }

    onSubmit(values) {

        let document = {
            "id": this.state.id,
            "doc_body": values.doc_body,
            "targetDate": values.targetDate,
            "vid_doc": values.vid_doc,
            "typ_doc": values.typ_doc,
            "org_name": values.org_name,
            "use_fio": values.id_use,
            "doc_number": values.doc_number,
            "doc_name": values.doc_name,
            "doc_register_date": values.doc_register_date,
            "doc_dispatch_date": values.doc_dispatch_date,
            "doc_note": values.doc_note
        }

        let newDocument = {
            "vid_doc": values.vid_doc,
            "typ_doc": values.typ_doc,
            "org_name": values.org_name,
            "use_fio": values.id_use,
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

    // validate(values) { // должен возвращать ошибку
    //     let errors = {};
    //     if (!values.description) {
    //         errors.description = 'Enter description';
    //     } else if (values.description.length < 5) {
    //         errors.description = 'Enter atleast 5 characters in descriptin';
    //     }

    //     if (!moment(values.targetDate).isValid()) {
    //         errors.targetDate = 'Enter a valid target date';
    //     }

    //     return errors;
    // }

    render() {
        let doc_name = this.state.doc_name,
            doc_body = this.state.doc_body,
            doc_note = this.state.doc_note,
            doc_register_date = this.state.doc_register_date,
            doc_dispatch_date = this.state.doc_dispatch_date;


        return (
            <div>
                <h1>Todo</h1>
                <div className='container'>
                    <Formik initialValues={
                        {
                            doc_name,
                            doc_body,
                            doc_note,
                            doc_register_date,
                            doc_dispatch_date,

                        }
                    }
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={this.onSubmit}
                        //validate={this.validate}
                        enableReinitialize={true}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage
                                        name='description'
                                        component='div'
                                        className='alert alert-warning' />
                                    <ErrorMessage
                                        name='targetDate'
                                        component='div'
                                        className='alert alert-warning' />
                                    <fieldset className='form-group'>
                                        <label>Номер документа</label>
                                        <Field className='form-control' type='text' name='doc_number' />
                                    </fieldset>
                                    <fieldset className='form-group'>
                                        <label>Название документа</label>
                                        <Field className='form-control' type='text' name='doc_name' />
                                    </fieldset>
                                    <fieldset className='form-group'>
                                        <label>Описание</label>
                                        <Field className='form-control' type='text' name='doc_body' />
                                    </fieldset>
                                    <fieldset className='form-group'>
                                        <label>Примечание</label>
                                        <Field className='form-control' type='text' name='doc_note' />
                                    </fieldset>
                                    <fieldset className='form-group'>
                                        <label>Дата создания</label>
                                        <Field className='form-control' type='date' name='doc_register_date' />
                                    </fieldset>
                                    <fieldset className='form-group'>
                                        <label>Дата отправки</label>
                                        <Field className='form-control' type='date' name='doc_dispatch_date' />
                                    </fieldset>
                                    <fieldset className='form-group'>
                                        <label>Составитель</label>
                                        <Select options={this.state.users} name='id_use' value={this.state.id_use} />
                                    </fieldset>
                                    <fieldset className='form-group'>
                                        <label>Вид документа</label>
                                        <Select options={this.state.vids} name='id_vid' value={this.state.id_vid} />
                                    </fieldset>
                                    <fieldset className='form-group'>
                                        <label>Тип документа</label>
                                        <Select options={this.state.types} name='id_typ' value={this.state.id_typ} />
                                    </fieldset>
                                    <fieldset className='form-group'>
                                        <label>Организация</label>
                                        <Select options={this.state.organisations} name='id_org' value={this.state.id_org} />
                                    </fieldset>

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