import React, {Fragment, useContext} from 'react';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Context
import { CRMContext, CRMProvider } from './context/CRMContext';

/* Layout */
import Navbar from './components/layout/Navbar';
import SideBarMenu from './components/layout/SideBarMenu';

// Componentes 
/* Dashboard */
import Dashboard from './components/dashboard/Dashboard';

/* Dashboard */
import Pedidos from './components/pedidos/Pedidos';
import DetallesPedidos from './components/pedidos/DetallesPedidos';
import NuevoPedido from './components/pedidos/NuevoPedido';

/* Categorias */
import Categorias from './components/categorias/Categorias';
import NuevaCategoria from './components/categorias/NuevaCategoria';
import EditarCategoria from './components/categorias/EditarCategoria';

/* Sliders */
import Sliders from './components/sliders/Sliders';
import NuevoSlider from './components/sliders/NuevoSlider';
import EditarSlider from './components/sliders/EditarSlider';

/* Marcas */
import Marcas from './components/marcas/Marcas';
import NuevaMarca from './components/marcas/NuevaMarca';
import EditarMarca from './components/marcas/EditarMarca';

/* Login */
import Login from './components/auth/Login';


const App = () => {
  // utilizar context en el componente
  const [ auth, guardarAuth ] = useContext(CRMContext);

  return (
    <Router>
      <Fragment>
        <CRMProvider value={[ auth, guardarAuth ]}>
          <Navbar />
          <SideBarMenu />
            <Switch>
                <Route exact path="/" component={Dashboard} />

                <Route exact path="/pedidos" component={Pedidos} />
                <Route exact path="/pedidos/agregar" component={NuevoPedido} />
                <Route exact path="/pedidos/:id" component={DetallesPedidos} />

                <Route exact path="/categorias" component={Categorias} />
                <Route exact path="/categorias/agregar" component={NuevaCategoria} />
                <Route exact path="/categorias/editar/:id" component={EditarCategoria} />

                <Route exact path="/sliders" component={Sliders} />
                <Route exact path="/sliders/agregar" component={NuevoSlider} />
                <Route exact path="/sliders/editar/:id" component={EditarSlider} />

                <Route exact path="/marcas" component={Marcas} />
                <Route exact path="/marcas/agregar" component={NuevaMarca} />
                <Route exact path="/marcas/editar/:id" component={EditarMarca} />

                <Route exact path="/iniciar-sesion" component={Login} />
            </Switch>
        </CRMProvider>
      </Fragment>
    </Router>
  );
}

export default App;