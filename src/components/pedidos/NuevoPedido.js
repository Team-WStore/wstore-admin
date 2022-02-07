import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';

// import el Context
import { CRMContext } from '../../context/CRMContext';

const NuevoPedido = (props) => {

    // utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth){
        props.history.push('/iniciar-sesion');
    }

    const [data, setData] = useState({});
    console.log("data: ",data);

    const leerDatos = (e) => {
        console.log("target: ", e.target.files);
        setData({
            ...data,
            [e.target.name] : e.target.files
        });
        console.log("data: ",data);
    }

    return (
        <main class="app-content">
            <div class="app-title">
                <div>
                <h1><i class="fa fa-edit"></i> Form Samples</h1>
                <p>Sample forms</p>
                </div>
                <ul class="app-breadcrumb breadcrumb">
                    <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
                    <li class="breadcrumb-item">Forms</li>
                    <li class="breadcrumb-item"><a href="#">Sample Forms</a></li>
                </ul>
            </div>
            <div class="row">
                <div class="col-md-12">
                <div class="tile">
                    <h3 class="tile-title">Vertical Form</h3>
                    <div class="tile-body">
                    <form>
                        <div class="form-group">
                        <label class="control-label">Name</label>
                        <input class="form-control" type="text" placeholder="Enter full name"/>
                        </div>
                        <div class="form-group">
                        <label class="control-label">Imagen Perfil</label>
                        <input class="form-control" type="file" name="img_perfil" multiple onChange={leerDatos}/>
                        </div>
                        <div class="form-group">
                        <label class="control-label">Email</label>
                        <input class="form-control" type="email" placeholder="Enter email address"/>
                        </div>
                        <div class="form-group">
                        <label class="control-label">Address</label>
                        <textarea class="form-control" rows="4" placeholder="Enter your address"></textarea>
                        </div>
                        <div class="form-group">
                        <label class="control-label">Gender</label>
                        <div class="form-check">
                            <label class="form-check-label">
                            <input class="form-check-input" type="radio" name="gender"/>Male
                            </label>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                            <input class="form-check-input" type="radio" name="gender"/>Female
                            </label>
                        </div>
                        </div>
                        <div class="form-group">
                        <label class="control-label">Identity Proof</label>
                        <input class="form-control" type="file"/>
                        </div>
                        <div class="form-group">
                        <div class="form-check">
                            <label class="form-check-label">
                            <input class="form-check-input" type="checkbox"/>I accept the terms and conditions
                            </label>
                        </div>
                        </div>
                    </form>
                    </div>
                    <div class="tile-footer">
                    <button class="btn btn-primary" type="button"><i class="fa fa-fw fa-lg fa-check-circle"></i>Register</button>&nbsp;&nbsp;&nbsp;<a class="btn btn-secondary" href="#"><i class="fa fa-fw fa-lg fa-times-circle"></i>Cancel</a>
                    </div>
                </div>
                </div>
                
            </div>
        </main>
    );
}

export default withRouter(NuevoPedido);