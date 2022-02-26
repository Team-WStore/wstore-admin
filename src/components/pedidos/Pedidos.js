import React, { useEffect, useState, useContext } from 'react';

// importar cliente axios
import {clienteAxios} from '../../config/axios';
import Spinner from '../layout/Spinner';
import { Link, withRouter } from 'react-router-dom';

// import el Context
import { CRMContext } from '../../context/CRMContext';
import Tabla from '../layout/Tabla';

const Pedidos = (props) => {
    // Trabajar con el state
    // clientes = state,  guardarClientes = funcion para guardar el state
    const [ pedidos, guardarPedidos ] = useState([]);
    console.log(pedidos);

    // utilizar valores del context
    const [auth, guardarAuth ] = useContext( CRMContext );

    // use effect es similar a componentdidmount y willmount
    useEffect( () => {

        if(auth.token !== '') {
            // Query a la API
            const consultarAPI = async () => {
                try {
                    const respuesta = await clienteAxios.get('/order/', {
                        headers: {
                            Authorization : `Token ${auth.token}`
                        }
                    });
                    guardarPedidos(respuesta.data);
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

    if(!pedidos.length) return <Spinner />

    const columnas = ["Id", "Id Pago", "Total","Revisado","Enviado","Entregado","Acciones"];

    let verDetalles = (id) => {
        props.history.push(`/pedidos/${id}`);
    }

    let editarEstadoPedido = (id) => {
        props.history.push(`/pedidos/editar/${id}`);
    }

    let dataFinal = [];
    pedidos.map(item => {
        var data = [];
        data.push(item["id"]);
        data.push(item["payment"]["charge_id"]);
        data.push((item["payment"]["amount"]).toFixed(2));
        data.push((item["reviewed"] ? "Revisado" : "No revisado"));
        data.push((item["sent"]  ? "Enviado" : "No Enviado"));
        data.push((item["delivered"] ? "Entregado" : "No Entregado"));
        dataFinal.push(data);
    });

    let acciones = [
        ["fa fa-info", verDetalles, "btn btn-info"],
        ["fa fa-refresh", editarEstadoPedido, "btn btn-warning"],
    ]; 

    if(!auth.auth){
        props.history.push('/iniciar-sesion');
    }

    return (
        <main className="app-content">
            <div className="app-title">
                <div>
                    <h1>Pedidos</h1>
                </div>
            </div>
            <br></br>
            <br></br>
            <div className="row">
                <Tabla acciones={acciones} headers={columnas} data={dataFinal} />
            </div>
        </main> 
    );
}

export default withRouter(Pedidos);