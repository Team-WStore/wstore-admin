import React, { useState, useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { clienteAxios } from '../../config/axios';
import Swal from 'sweetalert2';
// import el Context
import { CRMContext } from '../../context/CRMContext';

const EditarPedido = (props) => {

    // utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth){
        props.history.push('/iniciar-sesion');
    }
    // obtener el ID
    const { id } = props.match.params;

    const [estados, setEstados] = useState({});
    // use effect es similar a componentdidmount y willmount
    useEffect( () => {
        if(auth.token !== '') {
            // Query a la API
            const consultarAPI = async () => {
                try {
                    const respuesta = await clienteAxios.get(`/order-detail/${id}`, {
                        headers: {
                            Authorization : `Token ${auth.token}`
                        }
                    });
                    setEstados({
                        "reviewed": respuesta.data.reviewed,
                        "sent": respuesta.data.sent,
                        "delivered": respuesta.data.delivered,
                        "id": id
                    })
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

    const leerEstados = (e) => {
        setEstados({
            ...estados,
            [e.target.name] : e.target.checked
        });
    }

    const editarEstadoPedido = async e => {
        e.preventDefault();
        try {
            await clienteAxios.put('/order/', estados, {
                headers:{
                    Authorization : `Token ${auth.token}`,
                    'Content-Type': 'application/json',
                },
            });

            // alerta
            Swal.fire(
                'Estados del pedido editados correctamente',
                'Has editado el estado del pedido',
                'success'
            )
            // redireccionar
            props.history.push('/pedidos');
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
                    <h1><i className="fa fa-edit"></i>Editar Estados Pedido</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <h3 className="tile-title">Estados Pedido:</h3>
                        <div className="tile-body">
                            <form onSubmit={editarEstadoPedido}>
                                <div className="toggle lg">
                                    <h4>Revisado: </h4>
                                    <label>
                                        <input checked={estados.reviewed || false} onChange={leerEstados} name='reviewed' type="checkbox"/><span class="button-indecator"></span>
                                    </label>
                                </div>

                                <div className="toggle lg">
                                    <h4>Enviado: </h4>
                                    <label>
                                        <input checked={estados.sent || false} onChange={leerEstados} name='sent' type="checkbox"/><span class="button-indecator"></span>
                                    </label>
                                </div>

                                <div className="toggle lg">
                                    <h4>Entregado: </h4>
                                    <label>
                                        <input checked={estados.delivered || false} onChange={leerEstados} name='delivered' type="checkbox"/><span class="button-indecator"></span>
                                    </label>
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

export default withRouter(EditarPedido);