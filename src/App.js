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
            title: 'Title',
            list: [],
            test: '',
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

    render() {
        return (
            <div className='content'>
                <Link to='/do-link'>Добавить приложение</Link>
                <ul className={'list'}>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <div key={index}>
                                    {
                                        item.isURL
                                            ? <a target="_blank" rel="noopener noreferrer"  href={item.source}><b>{item.name}</b><img
                                                src={item.icon} alt=""/></a>
                                            : <a onClick={(e) => this.openWindowApp(e, item.source)} href="/#"><b>{item.name}</b><img
                                                src={item.icon} alt=""/></a>
                                    }

                                    <hr />
                                </div>
                            )
                        })
                    }
                </ul>
            </div>

        )
    }

    send(data) {
        ipcRenderer.send('info', data)
    }

}

export default App
