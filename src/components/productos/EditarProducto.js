import React, { useState, useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {clienteCloudinary, clienteAxios} from '../../config/axios';
import Swal from 'sweetalert2';

// import el Context
import { CRMContext } from '../../context/CRMContext';

const EditarCategoria = (props) => {
    // utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth){
        props.history.push('/iniciar-sesion');
    }

    // obtener el ID
    const { id } = props.match.params;

    let imagen = new FormData();
    const [data, setData] = useState({});
    var datos = new FormData();

    const leerDatos = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        });
    }

    const leerImagen = (e) => {
        if(!!e.target.files[0]){
            if(e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg'){
                imagen.append(e.target.name, e.target.files[0]);
            }
        }
    }

    // use effect es similar a componentdidmount y willmount
    useEffect( () => {
        if(auth.token !== '') {
            // Query a la API
            const consultarAPI = async () => {
                try {
                    const respuesta = await clienteAxios.get(`/category-modify/${id}`, {
                        headers: {
                            Authorization : `Token ${auth.token}`
                        }
                    });
                    console.log(respuesta.data);
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

    const editarCategoria = async e => {
        e.preventDefault();
        try {
            if(imagen.get('file')){
                const respuesta = await clienteCloudinary.post('/upload?upload_preset=categorypreset', imagen, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const url_image = respuesta.data.secure_url;

                const respuestota = await clienteAxios.post('/image/', {"image" : url_image},{
                    headers:{
                        Authorization : `Token ${auth.token}`,
                        'Content-Type': 'application/json',
                    },
                });
            
                const id_image = respuestota.data.id;
                datos.append("image_id", id_image);
            } else {
                datos.append("image_id", data.image.id);
            }
            
            datos.append("category_id", id);
            datos.append("name", data.name);
    
            const resCategoria = await clienteAxios.put('/category-update/', datos, {
                headers:{
                    Authorization : `Token ${auth.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            // alerta
            Swal.fire(
                'Categoría editada correctamente',
                'Has editado una categoría',
                'success'
            )
            // redireccionar
            props.history.push('/categorias');
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
                    <h1><i className="fa fa-edit"></i>Editar Categoría</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div className="tile-body">
                            <form onSubmit={editarCategoria}>
                                <div className="form-group">
                                    <label className="control-label">Nombre Categoría:</label>
                                    <input className="form-control" name="name" value={data.name} type="text" onChange={leerDatos} placeholder="Ingrese el nombre de la categoría: "/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Imagen Categoría:</label>
                                    <input className="form-control" name="file" type="file" accept="image/png, image/jpeg" onChange={leerImagen}/>
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

export default withRouter(EditarCategoria);