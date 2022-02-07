import React, {useState, useEffect, useContext} from 'react';

import { Link } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

const Navbar = (props) => {

    const addBodyClass = (className) => document.body.classList.add(className);
    const removeBodyClass = (className) => document.body.classList.remove(className);

    const [show, setShow] = useState(true);

    useEffect(
        () => {
            if (!show){
                addBodyClass("sidenav-toggled")
            }else{
                const bodyClass = document.body.classList[3]
                if(bodyClass){
                    removeBodyClass("sidenav-toggled")
                }
            }
        },
        [show]
    );

    const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth) return null;

    const cerrarSesion = () => {
        // auth.auth = false y el token se remueve
        guardarAuth({
            token: '',
            auth: false
        });

        localStorage.setItem('token', '');

        // redireccionar
        props.history.push('/iniciar-sesion');
    }

    return (
        <header className="app-header"><a className="app-header__logo" href="index.html">Admin Dashboard</a>
            <button className="app-sidebar__toggle" onClick={() => setShow(!show)} data-toggle="sidebar" aria-label="Hide Sidebar"></button>
            <ul className="app-nav">
                <li className="dropdown"><a className="app-nav__item" href="#" data-toggle="dropdown" aria-label="Open Profile Menu"><i className="fa fa-user fa-lg"></i></a>
                    <ul className="dropdown-menu settings-menu dropdown-menu-right">
                        <li><button onClick={() => cerrarSesion()} className="dropdown-item"><i className="fa fa-sign-out fa-lg"></i> Salir </button></li>
                    </ul>
                </li>
            </ul>
        </header>
    );
}

export default Navbar;