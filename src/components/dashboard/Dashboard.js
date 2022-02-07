import React, { useEffect, useState, useContext, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

// importar cliente axios
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';

// import el Context
import { CRMContext } from '../../context/CRMContext';
import LineChart from '../charts/LineChart';

const Dashboard = (props) => {

    const [auth, guardarAuth ] = useContext( CRMContext );

    // Si el state esta como false
    if(!auth.auth) {
        props.history.push('/iniciar-sesion');
    }

    const ventas = [20, 15, 40];
    let total_ventas = 0;
    ventas.map(e => total_ventas += e); 

    const visitas = [30, 115, 70];
    let total_visitas = 0;
    visitas.map(e => total_visitas += e); 

    return (
        <main className="app-content">
            <div className="row">
                <div className="col-md-6 col-lg-6">
                    <div className="widget-small primary coloured-icon"><i className="icon fa fa-usd fa-3x"></i>
                        <div className="info">
                            <h4>Total Ventas</h4>
                            <p><b>{total_ventas}</b></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-6">
                    <div className="widget-small primary coloured-icon"><i className="icon fa fa-eye fa-3x"></i>
                        <div className="info">
                            <h4>Total de Visitas</h4>
                            <p><b>{total_visitas}</b></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row ml-2">
                <h2>Gráficas:</h2>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="tile">
                        <h3 className="tile-title">Ventas Mensuales</h3>
                        <LineChart label={"Ventas"} scores={ventas} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="tile">
                        <h3 className="tile-title">Visitas Mensuales</h3>
                        <LineChart label={"Visitas"} scores={visitas} />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default withRouter(Dashboard);