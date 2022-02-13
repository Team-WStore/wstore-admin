import React, { useState, useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {clienteCloudinary, clienteAxios} from '../../config/axios';
import Swal from 'sweetalert2';
// import el Context
import { CRMContext } from '../../context/CRMContext';

const NuevaMarca = (props) => {
    // utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth){
        props.history.push('/iniciar-sesion');
    }

    const [datos, setDatos] = useState({});

    const nuevaMarca = async e => {
        e.preventDefault();
        // autenticar al usuario
        try {
            await clienteAxios.post('/brand/', datos, {
                headers:{
                    Authorization : `Token ${auth.token}`,
                    'Content-Type': 'application/json',
                },
            });

            // alerta
            Swal.fire(
                'Marca agregada correctamente',
                'Has agregado una marca',
                'success'
            )
            // redireccionar
            props.history.push('/marcas');
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: error.response.data.mensaje
            })
        }
    }

    const leerDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        });
    }

    return (
        <main className="app-content">
            <div className="app-title">
                <div>
                    <h1><i className="fa fa-edit"></i>Nueva Marca</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div className="tile-body">
                            <form onSubmit={nuevaMarca}>
                                <div className="form-group">
                                    <label className="control-label">Nombre Marca (*):</label>
                                    <input className="form-control" name="name" type="text" onChange={leerDatos} placeholder="Ingrese el nombre de la marca: "/>
                                </div>
                                <div className="tile-footer">
                                    <button className="btn btn-primary" type="submit"><i className="fa fa-fw fa-lg fa-check-circle"></i>Agregar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default withRouter(NuevaMarca);