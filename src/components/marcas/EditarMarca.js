import React, { useState, useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { clienteAxios} from '../../config/axios';
import Swal from 'sweetalert2';

// import el Context
import { CRMContext } from '../../context/CRMContext';

const EditarMarcas = (props) => {
    // utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth){
        props.history.push('/iniciar-sesion');
    }

    // obtener el ID
    const { id } = props.match.params;

    const [data, setData] = useState({});

    const leerDatos = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        });
    }


    // use effect es similar a componentdidmount y willmount
    useEffect( () => {
        if(auth.token !== '') {
            // Query a la API
            const consultarAPI = async () => {
                try {
                    const respuesta = await clienteAxios.get(`/brand-modify/${id}`, {
                        headers: {
                            Authorization : `Token ${auth.token}`
                        }
                    });
                    // colocar el resultado en el state
                    setData(respuesta.data);
                } catch (error) {
                    // Error con authorizacion
                    if(error.response.status === 500) {
                        props.history.push('/iniciar-sesion');
                    }
                }
            }
            consultarAPI();
        } else {
            props.history.push('/iniciar-sesion');
        }
    }, []);

    const editarMarcas = async e => {
        e.preventDefault();
        try {
            await clienteAxios.put(`/brand-modify/${id}`, data, {
                headers:{
                    Authorization : `Token ${auth.token}`,
                    'Content-Type': 'application/json',
                },
            });

            // alerta
            Swal.fire(
                'Marca editada correctamente',
                'Has editado una marca',
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

    return (
        <main className="app-content">
            <div className="app-title">
                <div>
                    <h1><i className="fa fa-edit"></i>Editar Marca</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div className="tile-body">
                            <form onSubmit={editarMarcas}>
                                <div className="form-group">
                                    <label className="control-label">Nombre Marca:</label>
                                    <input className="form-control" name="name" value={data.name} type="text" onChange={leerDatos} placeholder="Ingrese el nombre de la marca: "/>
                                </div>
                                <div className="tile-footer">
                                    <button className="btn btn-primary" type="submit"><i className="fa fa-fw fa-lg fa-check-circle"></i>Editar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default withRouter(EditarMarcas);