import React, { useState, useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {clienteCloudinary, clienteAxios} from '../../config/axios';
import Swal from 'sweetalert2';
// import el Context
import { CRMContext } from '../../context/CRMContext';

const NuevaCategoria = (props) => {
    // utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth){
        props.history.push('/iniciar-sesion');
    }

    let imagen = new FormData();
    var datos = new FormData();
    const [preview, setPreview] = useState();

    const nuevoSlider = async e => {
        e.preventDefault();
        try {
            const respuesta = await clienteCloudinary.post('/upload?upload_preset=sliderpreset', imagen,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const url_image = respuesta.data.secure_url;
        
            datos.append("image", url_image);
    
            const resSlider = await clienteAxios.post('/slider-modify/', datos, {
                headers:{
                    Authorization : `Token ${auth.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            // alerta
            Swal.fire(
                'Categoria agregada correctamente',
                'Has agregado una categoria',
                'success'
            )
            // redireccionar
            props.history.push('/sliders');
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
        datos.append( e.target.name , e.target.value);
    }

    const leerImagen = (e) => {
        if(!!e.target.files[0]){
            if(e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg'){
                imagen.append(e.target.name, e.target.files[0]);
            }
        }
    }

    return (
        <main className="app-content">
            <div className="app-title">
                <div>
                    <h1><i className="fa fa-edit"></i>Nuevo Slider</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div className="tile-body">
                            <form onSubmit={nuevoSlider}>
                                <div className="form-group">
                                    <label className="control-label">Nombre (*):</label>
                                    <input className="form-control" name="name" type="text" onChange={leerDatos} placeholder="Ingrese el nombre del slider: "/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Descripción (*):</label>
                                    <input className="form-control" name="description" type="text" onChange={leerDatos} placeholder="Ingrese la descripción del slider: "/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Url (*):</label>
                                    <input className="form-control" name="url" type="text" onChange={leerDatos} placeholder="Ingrese el url: "/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Imagen Categoría: (*)</label>
                                    <input className="form-control" name="file" type="file" accept="image/png, image/jpeg" onChange={leerImagen}/>
                                </div>
                                {!!preview && (
                                    <>
                                        <div className="form-group">
                                            <label className="control-label">Preview Imagen:</label>
                                        </div>
                                        <div>
                                            <img style={{width: 100+'%', maxWidth: 150, height: 'auto'}} src={preview}/>
                                        </div>
                                    </>
                                )} 
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

export default withRouter(NuevaCategoria);