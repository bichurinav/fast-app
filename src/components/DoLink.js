import React, {useState} from 'react'
import {Link} from "react-router-dom";
import store from '../store'
import './DoLink.scss'

// const electron = window.require('electron');
// const ipcRenderer  = electron.ipcRenderer;

export default (props) => {
    const [isURL, setURL] = useState(false);
    const [source, setSource] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    const [error, setError] = useState('');

    const sendForm = (e) => {
        e.preventDefault()
        if (source !== '' && name !== '' && file.value !== '') {
            setError('');

            let icon = URL.createObjectURL(file.files[0])
            setFile(icon)

            store.addApp({name, isURL, source, icon})
            setSource('');
            setName('');
        } else {
            setError('Заполните все поля');
        }
    }

    return (
        <div className='content'>
            <Link to='/'>Список приложений</Link>
            <form onSubmit={(e) => sendForm(e)} className="form-add">
                <div className="form-group">
                    <label htmlFor="name-input">Название приложения</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="name-input"/>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="url-check" onChange={() => setURL(!isURL)}/>
                    <label className="form-check-label" htmlFor="url-check">Является ссылкой</label>
                </div>
                <div className="form-group">
                    <label htmlFor="url-input">{!isURL ? 'Путь до программы' : 'Ссылка на источник'}</label>
                    <input value={source} onChange={(e) => setSource(e.target.value)} type="text" className="form-control" id="url-input"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlFile1">Example file input</label>
                    <input onChange={(e) => setFile(e.target)} type="file" className="form-control-file" id="exampleFormControlFile1" />
                </div>
                {/*<img src={file} alt=""/>*/}
                <button type="submit" className="btn btn-primary">Добавить</button>
                <span className='form-add__error'>{error}</span>
            </form>
        </div>
    )
}


