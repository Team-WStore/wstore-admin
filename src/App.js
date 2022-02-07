import React, {Fragment, useContext} from 'react';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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

/* Login */
import Login from './components/auth/Login';

// Context
import { CRMContext, CRMProvider } from './context/CRMContext';

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

                <Route exact path="/iniciar-sesion" component={Login} />
            </Switch>
        </CRMProvider>
      </Fragment>
    </Router>
  );
}

export default App;