import React, { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
// importar cliente axios
import {clienteAxios} from '../../config/axios';
import Spinner from '../layout/Spinner';
import { Link, withRouter } from 'react-router-dom';

// import el Context
import { CRMContext } from '../../context/CRMContext';
import Tabla from '../layout/Tabla';

const Categorias = (props) => {
    // Trabajar con el state
    // clientes = state,  guardarClientes = funcion para guardar el state
    const [ categorias, guardarCategorias ] = useState([]);
    const [ cambios, setCambios ] = useState(0);
    // utilizar valores del context
    const [auth, guardarAuth ] = useContext( CRMContext );

    // use effect es similar a componentdidmount y willmount
    useEffect( () => {

        if(auth.token !== '') {
            // Query a la API
            const consultarAPI = async () => {
                try {
                    const respuesta = await clienteAxios.get('/category/', {
                        headers: {
                            Authorization : `Token ${auth.token}`
                        }
                    });
                    console.log(respuesta.data);
                    // colocar el resultado en el state
                    guardarCategorias(respuesta.data);
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

    if(!categorias.length) return <Spinner />

    const columnas = ["Id","Nombre", "Acciones"];

    let editarCategoria = (id) => {
        props.history.push(`/categorias/editar/${id}`);
    }

    let eliminarCategoria = async(id) => {
        await clienteAxios.delete(`/category-modify/${id}`,{
            headers:{
                Authorization : `Token ${auth.token}`,
                'Content-Type': 'application/json',
            },
        });

        Swal.fire(
            'Categoria eliminada correctamente',
            'Has eliminado una categoria',
            'success'
        )
        // actalulizar
        // props.history.push('/categorias');
        setCambios( v => v + 1 );
    }

    let dataFinal = [];
    categorias.map(item => {
        var data = [];
        data.push(item["id"]);
        data.push(item["name"]);
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
                    <h1>Categorías</h1>
                </div>
            </div>
            <Link to={"/categorias/agregar"} className="btn btn-success">Nueva Categoría</Link>
            <br></br>
            <br></br>
            <div className="row">
                <Tabla acciones={acciones} headers={columnas} data={dataFinal} />
            </div>
        </main> 
    );
}

export default withRouter(Categorias);