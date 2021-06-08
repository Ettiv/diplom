import React, { Component } from 'react';
import moment from 'moment';
import { ErrorMessage, Field, Form, Formik } from 'formik';


import CustomSelect from '../customSelect/customSelect';

import '../../../../bootatrap.css';
import '../../../../App.css';

import DocumentDataService from '../../../../api/documet/documentDataService.js';
// import Spiner from '../../uiComponents/spiner/spiner';

export default class DocumentComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            id: +this.props.match.params.id,
            name: '',
            link: '',
            note: '',
            regNum: '',
            reg: moment(new Date()).format('YYYY-MM-DD'),
            out: moment(new Date()).format('YYYY-MM-DD'),
            vidId: '',
            typeDocId: '',
            employeeId: '',
            orgId: '',
            users: [],
            vids: [],
            types: [],
            organisations: []
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        DocumentDataService.retriveAllUsers()
            .then(response => {
                let users = [
                    {
                        "value": null,
                        "label": "..."
                    }
                ];
                response.data._embedded.employees.forEach(user => {
                    users.push({
                        "value": user.id,
                        "label": user.fio
                    })
                });
                this.setState({
                    users
                })
            });

            DocumentDataService.retriveAllVids()
            .then(response => {
                let vids = [
                    {
                        "value": null,
                        "label": "..."
                    }
                ];
                response.data._embedded.vids.forEach(vid => {
                    vids.push({
                        "value": vid.id,
                        "label": vid.name
                    })
                });
                this.setState({
                    vids
                })
            });

            DocumentDataService.retriveAllTypes()
            .then(response => {
                let types = [
                    {
                        "value": null,
                        "label": "..."
                    }
                ];
                response.data._embedded.types.forEach(type => {
                    types.push({
                        "value": type.id,
                        "label": type.name
                    })
                });
                this.setState({
                    types
                })
            });

            DocumentDataService.retriveAllOrganisations()
            .then(response => {
                let organisations = [
                    {
                        "value": null,
                        "label": "..."
                    }
                ];
                response.data._embedded.orgs.forEach(organisation => {
                    organisations.push({
                        "value": organisation.id,
                        "label": organisation.name
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

        DocumentDataService.retriveDocument(this.state.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    link: response.data.link,
                    note: response.data.note,
                    regNum: response.data.regNum,
                    reg: moment(response.data.reg).format('YYYY-MM-DD'),
                    out: moment(response.data.out).format('YYYY-MM-DD'),
                    typeDocId: response.data.typeDocId,
                    vidId: response.data.vidId,
                    orgId: response.data.orgId,
                    employeeId: response.data.employeeId
                });
            });

        this.setState({
            loading: false
        })
    }

    onSubmit(values) {

        let document = {
            "id": this.state.id,
            "link": values.link,
            "vidId": values.vids,
            "typeDocId": values.types,
            "orgId": values.organisations,
            "employeeId": values.users,
            "regNum": values.regNum,
            "name": values.name,
            "reg": values.reg,
            "out": values.out,
            "note": values.note
        }

        let newDocument = {
            "vidId": values.vids,
            "typeDocId": values.types,
            "orgId": values.organisations,
            "employeeId": values.users,
            "regNum": values.regNum,
            "name": values.name,
            "reg": values.reg,
            "out": values.out,
            "link": values.link,
            "note": values.note
        }

        if (this.state.id === -1) {
            DocumentDataService.createDocument(newDocument).then(() => {
                this.props.history.push('/documents');
            });
        } else {
            DocumentDataService.updateDocument(this.state.id, document)
                .then(() => {
                    this.props.history.push('/documents');
                });
        }
    }


    validate(values) { // должен возвращать ошибку
        let errors = {};
        if (!values.name) {
            errors.name = 'Введите название документа';
        } else if (values.name.length < 5) {
            errors.name = 'Минимум 5 букв в названии';
        }

        if (!values.link) {
            errors.link = 'Введите текст документа'
        }

        if (!values.note) {
            errors.note = 'Введите заметку документа'
        }

        if (!values.regNum) {
            errors.regNum = 'Введите номер документа'
        }

        if (!moment(values.reg).isValid()) {
            errors.reg = 'Введите дату регистрации документа';
        }

        if (!moment(values.out).isValid()) {
            errors.out = 'Введите дату отправки документа';
        }

        if (!values.users) {
            errors.users = 'Выберете составителя';
        }

        if (!values.vids) {
            errors.vids = 'Выберете вид документа';
        }

        if (!values.types) {
            errors.types = 'Выберете тип документа';
        }

        if (!values.organisations) {
            errors.organisations = 'Выберете Организацию';
        }

        return errors;
    }

    render() {

        return (
            <div>
                <h1>Документ</h1>
                <div className='container'>
                    <Formik initialValues={
                        {
                            name: this.state.name,
                            link: this.state.link,
                            note: this.state.note,
                            reg: this.state.reg,
                            out: this.state.out,
                            regNum: this.state.regNum,
                            users: this.state.employeeId,
                            vids: this.state.vidId,
                            types: this.state.typeDocId,
                            organisations: this.state.orgId
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
                                            name='regNum' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='regNum'
                                        component='div'
                                        className='alert alert-danger' />

                                    <fieldset className='form-group'>
                                        <label>Название документа</label>
                                        <Field className='form-control'
                                            type='text'
                                            name='name' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='name'
                                        component='div'
                                        className='alert alert-danger' />

                                    <fieldset className='form-group'>
                                        <label>Ссылка на документ</label>
                                        <Field className='form-control '
                                            type='text'
                                            name='link'/>                                           
                                        

                                    </fieldset>

                                    <ErrorMessage
                                        name='link'
                                        component='div'
                                        className='alert alert-danger' />

                                    <fieldset className='form-group'>
                                        <label>Примечание</label>
                                        <Field as='textarea' className='form-control'
                                            type='text'
                                            name='note'
                                            rows='4'>
                                            <textarea
                                                rows='4'/>
                                         </Field>
                                    </fieldset>

                                    <ErrorMessage
                                        name='note'
                                        component='div'
                                        className='alert alert-warning' />
                                    <fieldset className='form-danger'>

                                        <label>Дата создания</label>
                                        <Field className='form-control'
                                            type='date'
                                            name='reg' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='reg'
                                        component='div'
                                        className='alert alert-danger' />

                                    <fieldset className='form-group'>
                                        <label>Дата отправки</label>
                                        <Field className='form-control'
                                            type='date'
                                            name='out' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='out'
                                        component='div'
                                        className='alert alert-danger' />

                                    <fieldset className='form-group'>
                                        <label >Составитель</label>
                                        <CustomSelect
                                            options={this.state.users}
                                            name='users'
                                        />
                                    </fieldset>

                                    <ErrorMessage
                                        name='users'
                                        component='div'
                                        className='alert alert-danger' />

                                    <fieldset className='form-group'>
                                        <label>Вид документа</label>
                                        <CustomSelect
                                            options={this.state.vids}
                                            name='vids'
                                        />
                                    </fieldset>

                                    <ErrorMessage
                                        name='vids'
                                        component='div'
                                        className='alert alert-danger' />

                                    <fieldset className='form-group'>
                                        <label>Тип документа</label>
                                        <CustomSelect
                                            options={this.state.types}
                                            name='types'
                                        />
                                    </fieldset>

                                    <ErrorMessage
                                        name='types'
                                        component='div'
                                        className='alert alert-danger' />

                                    <fieldset className='form-group'>
                                        <label>Организация</label>
                                        <CustomSelect
                                            options={this.state.organisations}
                                            name='organisations'
                                        />
                                    </fieldset>

                                    <ErrorMessage
                                        name='organisations'
                                        component='div'
                                        className='alert alert-danger'
                                    />

                                    <button type='submit' className='btn btn-success'>Сохранить</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        );
    }
}

