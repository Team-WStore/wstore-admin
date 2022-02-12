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
    console.log(id);


    let imagen = new FormData();
    const [datos, setDatos] = useState({});
    console.log("datos: ", datos);

    const [preview, setPreview] = useState();
    console.log("preview: ", preview);

    const leerDatos = (e) => {
        setDatos({
            ...datos,
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
                    const respuesta = await clienteAxios.get(`/slider-modify/${id}`, {
                        headers: {
                            Authorization : `Token ${auth.token}`
                        }
                    });
                    console.log(respuesta.data);
                    // colocar el resultado en el state
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

    const editarSlider = async e => {
        e.preventDefault();
        try {
            if(imagen.get('file')){
                console.log("Si Hay Imagen");
                const respuesta = await clienteCloudinary.post('/upload?upload_preset=sliderpreset', imagen, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const url_image = respuesta.data.secure_url;
                datos.image = url_image;
                console.log("nuevos datos: ", datos);
            }
    
            const resSlider = await clienteAxios.put(`/slider-modify/${id}`, datos, {
                headers:{
                    Authorization : `Token ${auth.token}`,
                    'Content-Type': 'application/json',
                },
            });

            // alerta
            Swal.fire(
                'Slider editado correctamente',
                'Has editado un slider',
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

    return (
        <main className="app-content">
            <div className="app-title">
                <div>
                    <h1><i className="fa fa-edit"></i>Editar Slider</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div className="tile-body">
                            <form onSubmit={editarSlider}>
                                <div className="form-group">
                                    <label className="control-label">Nombre:</label>
                                    <input className="form-control" value={datos.name} name="name" type="text" onChange={leerDatos} placeholder="Ingrese el nombre del slider: "/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Descripción:</label>
                                    <input className="form-control" value={datos.description} name="description" type="text" onChange={leerDatos} placeholder="Ingrese la descripción del slider: "/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Url:</label>
                                    <input className="form-control" value={datos.url}name="url" type="text" onChange={leerDatos} placeholder="Ingrese el url: "/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Imagen Categoría:</label>
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

export default withRouter(EditarCategoria);