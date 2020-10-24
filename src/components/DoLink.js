import React from 'react'
import {Link} from "react-router-dom";

export default (props) => {
    return (
        <>
            <Link to='/'>Список приложений</Link>
            <form action="">
                <label htmlFor="">
                    <span>Является ссылкой</span>
                    <input type="checkbox"/>
                </label>
                <hr/>
                <label htmlFor="">
                    <span>Добавить url</span>
                    <input type="text"/>
                </label>
                <br/>
                <button>Добавить</button>
            </form>
        </>
    )
}


