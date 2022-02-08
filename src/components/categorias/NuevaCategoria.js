import React, { useState, useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {clienteCloudinary} from '../../config/axios';
import Swal from 'sweetalert2';
// import el Context
import { CRMContext } from '../../context/CRMContext';

const NuevaCategoria = (props) => {
    // utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth){
        props.history.push('/iniciar-sesion');
    }

    let formData = new FormData();
    
    const [preview, setPreview] = useState();
    console.log("preview: ", preview);

    const subirImagen = async e => {
        e.preventDefault();
        // autenticar al usuario
        try {
            const respuesta = await clienteCloudinary.post('/upload?upload_preset=categorypreset', formData,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            });
            console.log(respuesta.data);
            // alerta
            Swal.fire(
                'Categoria agregada correctamente',
                'Has agregado una categoria',
                'success'
            )
            // redireccionar
            // props.history.push('/');
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: error.response.data.mensaje
            })
        }
    }

    // const leerDatos = (e) => {
    //     setData({
    //         ...data,
    //         [e.target.name] : e.target.value
    //     });
    // }

    const leerImagen = (e) => {
        if(!!e.target.files[0]){
            if(e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg'){
                formData.append(e.target.name, e.target.files[0]);
            }
        }
    }

    useEffect(() => {
        if(!!formData.file){
            var objectUrl = URL.createObjectURL(formData.file);
            setPreview(objectUrl);
        }
        return () => URL.revokeObjectURL(objectUrl);
    }, [formData]);

    return (
        <main className="app-content">
            <div className="app-title">
                <div>
                    <h1><i className="fa fa-edit"></i>Nueva Categoría</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div className="tile-body">
                            <form onSubmit={subirImagen}>
                                {/* <div className="form-group">
                                    <label className="control-label">Nombre Categoría (*):</label>
                                    <input className="form-control" name="nombre" type="text" onChange={leerDatos} placeholder="Ingrese el nombre de la categoría: "/>
                                </div> */}
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

export default withRouter(NuevaCategoria);