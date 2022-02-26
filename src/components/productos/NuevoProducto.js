import React, { useState, useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {clienteCloudinary, clienteAxios} from '../../config/axios';
import Swal from 'sweetalert2';
// import el Context
import { CRMContext } from '../../context/CRMContext';

const NuevoProducto = (props) => {
    // utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth){
        props.history.push('/iniciar-sesion');
    }

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

    const subirProducto = async e => {
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
                datos.discount = parseInt(datos.discount);

                const resCategoria = await clienteAxios.post('/product-create/', datos, {
                    headers:{
                        Authorization : `Token ${auth.token}`,
                        'Content-Type': 'application/json',
                    },
                });

                // alerta
                Swal.fire(
                    'Producto agregada correctamente',
                    'Has agregado un producto',
                    'success'
                )
                // redireccionar
                props.history.push('/productos');
            }else{
                // alerta
                Swal.fire(
                    'No se pudo crear el producto',
                    'Las imagenes son necesarias',
                    'error'
                )
            }
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

    return (
        <main className="app-content">
            <div className="app-title">
                <div>
                    <h1><i className="fa fa-edit"></i>Nuevo Producto</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div className="tile-body">
                            <form onSubmit={subirProducto}>
                                <div className="form-group">
                                    <label className="control-label">Nombre Producto (*):</label>
                                    <input className="form-control" name="name" type="text" required onChange={leerDatos} placeholder="Ingrese el nombre del producto: "/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Descripción Producto (*):</label>
                                    <input className="form-control" name="description" type="text" required onChange={leerDatos} placeholder="Ingrese la descripción del producto: "/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Categoría Producto (*):</label>
                                    <select className="form-control" required name="category" onChange={leerDatos}>
                                        {categorias.map(categoria => <option key={categoria.id} value={categoria.id}>{categoria.name}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Marca Producto (*):</label>
                                    <select className="form-control" required name="brand" onChange={leerDatos}>
                                        {marcas.map(marca => <option key={marca.id} value={marca.id}>{marca.name}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Precio Producto (*):</label>
                                    <input className="form-control" required name="price" type="number" min={0} step={0.01} onChange={leerDatos} placeholder="Ingrese el precio del producto: "/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Porcentaje Descuento (*):</label>
                                    <input className="form-control" required name="discount" type="number" min={0} onChange={leerDatos} placeholder="Ingrese el porcentaje del producto: "/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Stock Producto (*):</label>
                                    <input className="form-control" required name="available" type="number" min={0} onChange={leerDatos} placeholder="Ingrese el stock del producto: "/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Imagenes Producto:</label>
                                    <input className="form-control" required name="files" type="file" multiple accept="image/png, image/jpeg" onChange={leerImagen}/>
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

export default withRouter(NuevoProducto);