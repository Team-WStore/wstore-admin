import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

const SideBarMenu = (props) => {

    const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth) return null;

    return (
        <>
            <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
            <aside className="app-sidebar">
                <ul className="app-menu">
                    <li><Link to={"/"} className="app-menu__item"><i className="app-menu__icon fa fa-area-chart"></i><span className="app-menu__label">Tablero</span></Link></li>
                    <li><Link to={"/pedidos"} className="app-menu__item"><i className="app-menu__icon fa fa-shopping-cart"></i><span className="app-menu__label">Pedidos</span></Link></li>
                    <li><Link to={"/productos"} className="app-menu__item"><i className="app-menu__icon fa fa-shopping-cart"></i><span className="app-menu__label">Productos</span></Link></li>
                    <li><Link to={"/categorias"} className="app-menu__item"><i className="app-menu__icon fa fa-tag"></i><span className="app-menu__label">Categorias</span></Link></li>
                    <li><Link to={"/marcas"} className="app-menu__item"><i className="app-menu__icon fa fa-tag"></i><span className="app-menu__label">Marcas</span></Link></li>
                    <li><Link to={"/sliders"} className="app-menu__item"><i className="app-menu__icon fa fa-sitemap"></i><span className="app-menu__label">Sliders</span></Link></li>
                </ul>
            </aside>
        </>
    );
}

export default SideBarMenu;