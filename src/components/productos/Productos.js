import React, { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
// importar cliente axios
import {clienteAxios} from '../../config/axios';
import Spinner from '../layout/Spinner';
import { Link, withRouter } from 'react-router-dom';

// import el Context
import { CRMContext } from '../../context/CRMContext';
import Tabla from '../layout/Tabla';

const Productos = (props) => {
    // Trabajar con el state
    // clientes = state,  guardarClientes = funcion para guardar el state
    const [ productos, guardarProductos] = useState([]);
    const [ cambios, setCambios ] = useState(0);
    // utilizar valores del context
    const [auth, guardarAuth ] = useContext( CRMContext );

    // use effect es similar a componentdidmount y willmount
    useEffect( () => {
        if(auth.token !== '') {
            // Query a la API
            const consultarAPI = async () => {
                try {
                    const respuesta = await clienteAxios.get('/product/', {
                        headers: {
                            Authorization : `Token ${auth.token}`
                        }
                    });
                    console.log(respuesta.data);
                    // colocar el resultado en el state
                    guardarProductos(respuesta.data);
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
    }, [cambios]);

    if(!productos.length) return <Spinner />

    let editarCategoria = (id) => {
        props.history.push(`/productos/editar/${id}`);
    }

    let eliminarCategoria = async(id) => {
        await clienteAxios.delete(`/category-modify/${id}`,{
            headers:{
                Authorization : `Token ${auth.token}`,
                'Content-Type': 'application/json',
            },
        });

        Swal.fire(
            'Producto eliminado correctamente',
            'Has eliminado un producto',
            'success'
        )
        // actalulizar
        // props.history.push('/productos');
        setCambios( v => v + 1 );
    }

    const columnas = ["Id", "Nombre", "Descripción", "Precio", "Stock", "Acciones"];

    let dataFinal = [];
    productos.map(item => {
        var data = [];
        data.push(item["id"]);
        data.push(item["name"]);
        data.push(item["description"]);
        data.push(item["price"]);
        data.push(item["available"]);
        dataFinal.push(data);
    });

    let acciones = [
        ["fa fa-refresh", editarCategoria, "btn btn-warning"],
        ["fa fa-trash", eliminarCategoria, "btn btn-danger"],
    ]; 

    if(!auth.auth){
        props.history.push('/iniciar-sesion');
    }

    return (
        <main className="app-content">
            <div className="app-title">
                <div>
                    <h1>Productos</h1>
                </div>
            </div>
            <Link to={"/productos/agregar"} className="btn btn-success">Nuevo Producto</Link>
            <br></br>
            <br></br>
            <div className="row">
                <Tabla acciones={acciones} headers={columnas} data={dataFinal} />
            </div>
        </main> 
    );
}

export default withRouter(Productos);