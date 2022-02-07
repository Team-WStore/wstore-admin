import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

const DetallesPedidos = (props) => {

    // obtener el ID
    const { id } = props.match.params;

    console.log(id);

    // utilizar valores del context
    const [auth, guardarAuth ] = useContext(CRMContext);

    if(!auth.auth){
        props.history.push('/iniciar-sesion');
    }

    return (
        <main className="app-content">
            <div className="app-title">
                <div>
                    <h1><i className="fa fa-file-text-o"></i> Detalles</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                <div className="tile">
                    <section className="invoice">
                    <div className="row mb-4">
                        <div className="col-6">
                        <h2 className="page-header"><i className="fa fa-globe"></i>WStore</h2>
                        </div>
                        <div className="col-6">
                        <h5 className="text-right">Date: 01/01/2016</h5>
                        </div>
                    </div>
                    <div className="row invoice-info">
                        <div className="col-4">De
                        <address><strong>WStore</strong><br/>Cra 1B # 2-3<br/>Neiva, Huila<br/>Colombia<br/>Email: support@wstore.com</address>
                        </div>
                        <div className="col-4">Para
                        <address><strong>Jhon Mauricio</strong><br/>795 Folsom Ave, Suite 600<br/>San Francisco, CA 94107<br/>Phone: (555) 539-1037<br/>Email: john.doe@example.com</address>
                        </div>
                        <div className="col-4"><b>Invoice #007612</b><br/><br/><b>Order ID:</b> 4F3S8J<br/><b>Payment Due:</b> 2/22/2014<br/><b>Account:</b> 968-34567</div>
                    </div>
                    <div className="row">
                        <div className="col-12 table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Qty</th>
                                <th>Product</th>
                                <th>Serial #</th>
                                <th>Description</th>
                                <th>Subtotal</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>The Hunger Games</td>
                                <td>455-981-221</td>
                                <td>El snort testosterone trophy driving gloves handsome</td>
                                <td>$41.32</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>City of Bones</td>
                                <td>247-925-726</td>
                                <td>Wes Anderson umami biodiesel</td>
                                <td>$75.52</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>The Maze Runner</td>
                                <td>545-457-47</td>
                                <td>Terry Richardson helvetica tousled street art master</td>
                                <td>$15.25</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>The Fault in Our Stars</td>
                                <td>757-855-857</td>
                                <td>Tousled lomo letterpress</td>
                                <td>$03.44</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </section>
                </div>
                </div>
            </div>
        </main>
    );
}

export default withRouter(DetallesPedidos);