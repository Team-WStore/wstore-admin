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

    const [imagenes, setImagenes] = useState([]);

    const [datos, setDatos] = useState({});

    const [categorias, setCategorias] = useState([]);
    const [marcas, setMarcas] = useState([]);

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
                    setCategorias(respuesta.data);
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

    // use effect es similar a componentdidmount y willmount
    useEffect( () => {
        if(auth.token !== '') {
            // Query a la API
            const consultarAPI = async () => {
                try {
                    const respuesta = await clienteAxios.get('/brand/', {
                        headers: {
                            Authorization : `Token ${auth.token}`
                        }
                    });
                    console.log(respuesta.data);
                    // colocar el resultado en el state
                    setMarcas(respuesta.data);
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

    useEffect( () => {
        if(auth.token !== '') {
            // Query a la API
            const consultarAPI = async () => {
                try {
                    const respuesta = await clienteAxios.get(`/product/${id}`, {
                        headers: {
                            Authorization : `Token ${auth.token}`
                        }
                    });
                    console.log(respuesta.data);
                    respuesta.data.brand = respuesta.data.brand.id
                    respuesta.data.category = respuesta.data.category.id
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

    const leerDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        });
    }

    const leerImagen = (e) => {
        if(!!e.target.files[0]){
            if(e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg'){
                setImagenes({
                    ...imagenes,
                    [e.target.name] : e.target.files
                });
            }
        }
    }

    const editarProducto = async e => {
        e.preventDefault();
        try {
            if(imagenes.files){
                const files = Array.from(imagenes.files);
                var images = [];

                for (const image of files) {
                    let imagenForm = new FormData();
                    imagenForm.append("file", image);
                    const respuesta = await clienteCloudinary.post('/upload?upload_preset=productpreset', imagenForm, {
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
                    images.push(id_image)
                }

                datos.images = images;
            }

            datos.discount = parseInt(datos.discount);
            // datos.brand = datos.brand.id || datos.brand;
            // datos.category = datos.category.id || datos.category;

            console.log("Datos a enviados: ", datos);

            const resProducto = await clienteAxios.put('/product-update/', datos, {
                headers:{
                    Authorization : `Token ${auth.token}`,
                    'Content-Type': 'application/json',
                },
            });

            // alerta
            Swal.fire(
                'Producto editado correctamente',
                'Has editado un producto',
                'success'
            )
            // redireccionar
            props.history.push('/productos');
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
                    <h1><i className="fa fa-edit"></i>Editar Producto</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div className="tile-body">
                            <form onSubmit={editarProducto}>
                                <div className="form-group">
                                    <label className="control-label">Nombre Producto (*):</label>
                                    <input className="form-control" value={datos.name || ""} name="name" type="text" onChange={leerDatos} placeholder="Ingrese el nombre del producto: "/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Descripción Producto (*):</label>
                                    <input className="form-control" value={datos.description || ""} name="description" type="text" onChange={leerDatos} placeholder="Ingrese la descripción del producto: "/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Categoría Producto (*):</label>
                                    <select className="form-control" name="category" onChange={leerDatos}>
                                        {categorias.map(categoria => <option key={categoria.id} value={categoria.id}>{categoria.name}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Marca Producto (*):</label>
                                    <select className="form-control" name="brand" onChange={leerDatos}>
                                        {marcas.map(marca => <option key={marca.id} value={marca.id}>{marca.name}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Precio Producto (*):</label>
                                    <input className="form-control" value={datos.price || 0} name="price" type="number" min={0} step={0.01} onChange={leerDatos} placeholder="Ingrese el precio del producto: "/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Porcentaje Descuento (*):</label>
                                    <input className="form-control" value={datos.discount || 0} name="discount" type="number" min={0} onChange={leerDatos} placeholder="Ingrese el porcentaje del producto: "/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Stock Producto (*):</label>
                                    <input className="form-control" value={datos.available || 0} name="available" type="number" min={0} onChange={leerDatos} placeholder="Ingrese el stock del producto: "/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Imagenes Producto:</label>
                                    <input className="form-control" name="files" type="file" multiple accept="image/png, image/jpeg" onChange={leerImagen}/>
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