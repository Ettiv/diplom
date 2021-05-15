import { Component } from 'react';

import DocumentDataService from '../../../../api/documet/documentDataService.js';

export default class DocumentWatch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            id: +this.props.match.params.id,
            doc_name: '',
            doc_body: '',
            doc_note: '',
            doc_number: '',
            doc_register_date: '',
            doc_dispatch_date: '',
            vid_doc_id: '',
            typ_doc_id: '',
            use_id: '',
            org_id: ''
        }
    }

    componentDidMount() {
        DocumentDataService.retriveDocument(this.state.id)
            .then(response => {
                this.setState({
                    doc_name: response.data.doc_name,
                    doc_body: response.data.doc_body,
                    doc_note: response.data.doc_note,
                    doc_number: response.data.doc_number,
                    doc_register_date: response.data.doc_register_date,
                    doc_dispatch_date: response.data.doc_dispatch_date,
                    typ_doc_id: response.data.typ_doc_id,
                    vid_doc_id: response.data.vid_doc_id,
                    org_id: response.data.org_id,
                    use_id: response.data.use_id
                });
            });
    }


    render() {
        return (
            <div>
                <h1 className='text-center text-uppercase'>
                    {this.state.doc_name}
                </h1>
                <div className='row'>
                    <div className='col-8'>
                        <div className='container'>
                            <h5 className='text-left text-uppercase'>
                                Тескт документа:
                            </h5>
                        </div>
                        <div className='container text-left text-justify'>
                            <pre>
                                {this.state.doc_body}
                            </pre>                           
                        </div>
                        <br/>
                        <div className='container'>
                            <h6 className='text-left text-uppercase'>
                                Примечание:
                            </h6>
                        </div>
                        <div className='container text-left text-justify'>
                            <pre>
                                {this.state.doc_note}
                            </pre>                            
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='container'>

                            <table className='table table-bordered bg-success'>
                                <tr>
                                    <th>Номер документа</th><td>{this.state.doc_number}</td>
                                </tr>
                                <tr>
                                    <th>Дата регистрации</th><td>{this.state.doc_register_date}</td>
                                </tr>
                                <tr>
                                    <th>Дата отправки</th><td>{this.state.doc_dispatch_date}</td>
                                </tr>
                                <tr>
                                    <th>Составитель</th><td>{this.state.use_id}</td>
                                </tr>
                                <tr>
                                    <th>Вид документа</th><td>{this.state.typ_doc_id}</td>
                                </tr>
                                <tr>
                                    <th>Тип документа</th><td>{this.state.vid_doc_id}</td>
                                </tr>
                                <tr>
                                    <th>Организация</th><td>{this.state.org_id}</td>
                                </tr>

                            </table>
                        </div>
                    </div>
                    <div className='col-1' />
                </div>
            </div>
        );
    }
}