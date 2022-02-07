import React, {useEffect} from 'react';

import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

const Tabla = (props) => {

    const { headers=[], data=[], acciones=[] } = props;

    useEffect(() => {
      setTimeout(()=>{
        $("#sampleTable").DataTable();
      },1000)
    }, [])

    return (
        <div className="col-md-12">
            <div className="tile">
              <div className="tile-body">
                <div className="table-responsive">
                  <table className="table table-hover table-bordered" id="sampleTable">
                    <thead>
                      <tr>
                        {headers.map((item,idx) => (
                            <th key={item}>{item}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, idx) => (
                        <tr key={idx}>
                          {row.map((data, idx) => (<td key={idx}>{data}</td>))}
                          <td>{acciones.map((info, idx) => (<button className={"mr-1 mb-1 " + info[2]} key={idx} onClick={() =>info[1](row[0])}><center><i className={info[0]} aria-hidden="true"></i></center></button>))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        </div>
    );
}

export default Tabla;