import React, {useState, useContext} from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';

// Context
import { CRMContext } from '../../context/CRMContext';

const Login = (props) => {
    // Auth y token
    const [auth, guardarAuth] = useContext(CRMContext);

    // State con los datos del formulario
    const [ credenciales, guardarCredenciales] = useState({});

    // iniciar sesión en el servidor
    const iniciarSesion = async e => {
        e.preventDefault();
        // autenticar al usuario
        try {
            const respuesta = await clienteAxios.post('/api/auth/login', credenciales);
            
            // extraer el token y colocarlo en localstorage
            const { token } = respuesta.data;
            localStorage.setItem('token', token);

            // colocarlo en el state
            guardarAuth({
                token, 
                auth: true
            })

            // alerta
            Swal.fire(
                'Login Correcto',
                'Has iniciado Sesión',
                'success'
            )
            // redireccionar
            props.history.push('/');
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: error.response.data.mensaje
            })
        }
    }

    // almacenar lo que el usuario escribe en el state
    const leerDatos = e => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name] : e.target.value
        })
    }

    if(auth.auth){
        props.history.push('/');
    }

    return (
        <>
            <section className="material-half-bg">
                <div className="cover"></div>
            </section>
            <section className="login-content">
                <div className="logo">
                    <h1>Admin Dashboard</h1>
                </div>
                <div className="login-box">
                    <form className="login-form" onSubmit={iniciarSesion}>
                        <h3 className="login-head"><i className="fa fa-lg fa-fw fa-user"></i>Bienvenido </h3>
                        <div className="form-group">
                            <label className="control-label">Email:</label>
                            <input className="form-control" type="text" placeholder="Email" name="email" autoFocus required onChange={leerDatos} />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Contraseña:</label>
                            <input className="form-control" type="password" placeholder="Password" name="password" required onChange={leerDatos} />
                        </div>
                        <br></br>
                        <div className="form-group btn-container">
                            <button type="submit" className="btn btn-primary btn-block"><i className="fa fa-sign-in fa-lg fa-fw"></i>Ingresar</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}

export default withRouter(Login);