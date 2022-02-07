import React, { useState, useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

// import el Context
import { CRMContext } from '../../context/CRMContext';

const NuevaCategoria = (props) => {
    // utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth){
        props.history.push('/iniciar-sesion');
    }

    const [data, setData] = useState({});
    console.log("data: ",data);

    const [preview, setPreview] = useState();
    console.log("preview: ", preview);

    const leerDatos = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        });
    }

    const leerImagen = (e) => {
        if(!!e.target.files[0]){
            if(e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg'){
                setData({
                    ...data,
                    [e.target.name] : e.target.files[0]
                });
            }
        }
    }

    useEffect(() => {
        if(!!data.img){
            var objectUrl = URL.createObjectURL(data.img);
            setPreview(objectUrl);
        }
        return () => URL.revokeObjectURL(objectUrl);
    }, [data]);

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
                            <form>
                                <div className="form-group">
                                    <label className="control-label">Nombre Categoría (*):</label>
                                    <input className="form-control" name="nombre" type="text" onChange={leerDatos} required placeholder="Ingrese el nombre de la categoría: "/>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Imagen Categoría:</label>
                                    <input className="form-control" name="img" type="file" accept="image/png, image/jpeg" onChange={leerImagen}/>
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
                            </form>
                        </div>
                        <div className="tile-footer">
                            <button className="btn btn-primary" type="button"><i className="fa fa-fw fa-lg fa-check-circle"></i>Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default withRouter(NuevaCategoria);