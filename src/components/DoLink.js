import React, {useState} from 'react'
import {Link} from "react-router-dom";
import store from '../store'
import './DoLink.scss'

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export default (props) => {
    const [isURL, setURL] = useState(false);
    const [source, setSource] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    const [error, setError] = useState('');
    const [previewIcon, setPreviewIcon] = useState('');

    const sendForm = (e) => {
        e.preventDefault()
        if (source !== '' && name !== '') {
            if (file !== '') {
                setError('');
                store.addApp({name, isURL, source, file})
                setSource('');
                setName('');
            } else {
                setError('Добавьте иконку!');
            }
        } else {
            setError('Заполните все поля!');
        }
    }

    const addIcon = (e) => {
        ipcRenderer.send('icon',  e.target.files[0].path)
        ipcRenderer.on('file', (event, icon) => {
            setFile(icon)
        })
        setPreviewIcon(URL.createObjectURL(e.target.files[0]))
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
                    {
                        !isURL

                            ?   <><label htmlFor="source">Программа</label><input onChange={(e) => setSource(e.target.files[0].path)} type="file" className="form-control-file" id="source" /></>
                            :   <><label htmlFor="url-input">Ссылка на источник</label><input value={source} onChange={(e) => setSource(e.target.value)} type="text" className="form-control" id="url-input"/></>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="icon">Иконка</label>
                    <input onChange={(e) => addIcon(e)} type="file" className="form-control-file" id="icon" />
                </div>
                <button type="submit" className="btn btn-primary">Добавить</button>
                <img className='form-add__img' height='50px' src={previewIcon} alt=""/>
                <span className='form-add__error'>{error}</span>
            </form>
        </div>
    )
}


