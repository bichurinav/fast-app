import React, {Component} from 'react';
import {Link} from "react-router-dom";

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class App extends Component {
    constructor(options) {
        super(options);
        this.state = {
            title: 'Title',
            list: [
                {name: 'Webpack', icon: '', to: '', isURL: true},
                {name: 'Steam', icon: '', to: '', isURL: false},
            ],
        }
    }

    render() {
        return (
            <>
                <Link to='/do-link'>Добавить приложение</Link>
                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <div key={index}>
                                    <h3>{item.name}</h3>
                                </div>
                            )
                        })
                    }
                </ul>
            </>

        )
    }

    send(data) {
        ipcRenderer.send('info', data)
    }

}

export default App
