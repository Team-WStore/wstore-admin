import React, { useContext, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { clienteAxios } from '../../config/axios';
import Spinner from '../layout/Spinner';
import Swal from 'sweetalert2';

import { CRMContext } from '../../context/CRMContext';

const DetallesPedidos = (props) => {

    // obtener el ID
    const { id } = props.match.params;
    console.log(id);

    // utilizar valores del context
    const [auth, guardarAuth ] = useContext(CRMContext);

    if(!auth.auth){
        props.history.push('/iniciar-sesion');
    }

    const [datos, setDatos] = useState({});
    console.log("datos: ", datos);

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
                    respuesta.data.payment.timestamp = respuesta.data.payment.timestamp.split('T')[0];
                    setDatos(respuesta.data);
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
    
    if(Object.keys(datos).length === 0) return <Spinner />

    return (
        <main className="app-content">
            <div className="app-title">
                <div>
                    <h1><i className="fa fa-file-text-o"></i> Detalles</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                <div className="tile">
                    <section className="invoice">
                    <div className="row mb-4">
                        <div className="col-6">
                        <h2 className="page-header"><i className="fa fa-globe"></i>WStore</h2>
                        </div>
                        <div className="col-6">
                        <h5 className="text-right">Fecha: {datos['payment']['timestamp']}</h5>
                        </div>
                    </div>
                    <div className="row invoice-info">
                        <div className="col-4"><strong>Datos Empresa:</strong>
                        <address>WStore<br/>Cra 1B # 2-3<br/>Neiva, Huila<br/>Colombia<br/>Email: support@wstore.com</address>
                        </div>
                        <div className="col-4"><strong>Datos Envio Comprador:</strong>
                        <address><strong>Dirección:</strong> {datos['shipping_address']['address'] || ""}<br/><strong>Ciudad:</strong> {datos['shipping_address']['city'] || ""}<br/><strong>Código Postal:</strong> {datos['shipping_address']['zip'] || ""}</address>
                        </div>
                        <div className="col-4"><br/><br/><b>Order ID: </b>{datos.ref_code || ""}<br/><b>Fecha Pago:</b> {datos['payment']['timestamp']}<br/><b>ID pago:</b> {datos['payment']['charge_id']}</div>
                    </div>
                    <div className="row">
                        <div className="col-12 table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Descripcion</th>
                                <th>Precio Unitario</th>
                                <th>Subtotal</th>
                            </tr>
                            </thead>
                            <tbody>
                                {datos.products.map(producto => (
                                    <tr>
                                        <td>{producto.id}</td>
                                        <td>{producto.product.name}</td>
                                        <td>{producto.quantity}</td>
                                        <td>{producto.product.description}</td>
                                        <td>{`$ ${producto.product.price}`}</td>
                                        <td>{`$ ${parseFloat(producto.product.price) * parseInt(producto.quantity)}`}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><strong>Total:</strong></td>
                                    <td><strong>{`$ ${(datos.payment.amount).toFixed(2)}`}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </section>
                </div>
                </div>
            </div>
        </main>
    );
}

export default withRouter(DetallesPedidos);