import { Component } from 'react';
import moment from 'moment';

import DocumentDataService from '../../../../api/documet/documentDataService.js';

export default class DocumentWatch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            id: +this.props.match.params.id,
            name: '',
            link: '',
            note: '',
            regNum: '',
            reg: '',
            out: '',
            vid:'',
            type:'',
            employee:'',
            org:''
        }
    }

    componentDidMount() {
        DocumentDataService.retriveReadyDocument(this.state.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    link: response.data.link,
                    note: response.data.note,
                    regNum: response.data.regNum,
                    reg: response.data.reg,
                    out: response.data.out,
                    typeDoc: response.data.typeDoc.name,
                    vid: response.data.vidDoc.name,
                    org: response.data.org.name,
                    employee: response.data.employee.fio
                })
            });
    }


    render() {
        return (
            <div>
                <h1 className='text-center text-uppercase'>
                    {this.state.name}
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
                                {this.state.link}
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
                                {this.state.note}
                            </pre>                            
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='container'>

                            <table className='table table-bordered bg-success'>
                                <tr>
                                    <th>Номер документа</th><td>{this.state.regNum}</td>
                                </tr>
                                <tr>
                                    <th>Дата регистрации</th><td>{moment(this.state.reg).format('YYYY-MM-DD')}</td>
                                </tr>
                                <tr>
                                    <th>Дата отправки</th><td>{moment(this.state.out).format('YYYY-MM-DD')}</td>
                                </tr>
                                <tr>
                                    <th>Составитель</th><td>{this.state.employee}</td>
                                </tr>
                                <tr>
                                    <th>Вид документа</th><td>{this.state.vid}</td>
                                </tr>
                                <tr>
                                    <th>Тип документа</th><td>{this.state.typeDoc}</td>
                                </tr>
                                <tr>
                                    <th>Организация</th><td>{this.state.org}</td>
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