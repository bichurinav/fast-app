import React, {Component} from 'react';
import {Link} from "react-router-dom";
import store from './store'

import './App.scss'

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class App extends Component {
    constructor(options) {
        super(options);
        this.state = {
            list: [],
            hideName: window.localStorage.getItem('hide') || false,
            btnDel: true,
        }
    }

    componentWillMount() {
        this.setState({
            list: store.getList()
        })
    }

    openWindowApp(e, source) {
        e.preventDefault();
        ipcRenderer.send('open-app', source)
    }

    showHideName() {
        if (window.localStorage.getItem('hide') === '') {
            window.localStorage.setItem('hide', '1')
            this.setState({
                hideName: window.localStorage.getItem('hide')
            })
        } else {
            window.localStorage.setItem('hide', '')
            this.setState({
                hideName: window.localStorage.getItem('hide')
            })
        }
    }

    showBtnDel() {
        this.setState({
            btnDel: !this.state.btnDel
        })
    }

    delApp(name) {
        store.delApp(name)
        this.setState({
            list: store.getList()
        })
    }

    render() {
        return (
            <div className='content'>
                <div className='menu-link'>
                    <Link to='/do-link'>Добавить приложение</Link>
                    <input onChange={this.showHideName.bind(this)} className='name-hide' type="checkbox" checked={this.state.hideName}/>
                    <svg onClick={this.showBtnDel.bind(this)} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-bag-x" fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5H2z"/>
                        <path fillRule="evenodd"
                              d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </div>
                <div className={'list'}>

                    {
                        this.state.list.map((item, index) => {
                            return (
                                <div className={'list__app'} key={index}>
                                    <svg onClick={this.delApp.bind(this, item.name)} hidden={this.state.btnDel} width="1em" height="1em" viewBox="0 0 16 16" className="list__del bi bi-backspace" fill="currentColor"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M6.603 2h7.08a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-7.08a1 1 0 0 1-.76-.35L1 8l4.844-5.65A1 1 0 0 1 6.603 2zm7.08-1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zM5.829 5.146a.5.5 0 0 0 0 .708L7.976 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
                                    </svg>
                                    {
                                        item.isURL

                                            ? <a target="_blank" rel="noopener noreferrer"  href={item.source}><img
                                                src={item.file} alt=""/>{!this.state.hideName ? <b>{item.name}</b> : ''}</a>
                                            : <a onClick={(e) => this.openWindowApp(e, item.source)} href="/#"><img
                                                src={item.file} alt=""/>{!this.state.hideName ? <b>{item.name}</b> : ''}</a>
                                    }

                                </div>
                            )
                        })
                    }
                </div>
            </div>

        )
    }

    send(data) {
        ipcRenderer.send('info', data)
    }

}

export default App
