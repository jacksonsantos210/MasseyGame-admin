import React, {useState, useEffect, useContext} from 'react'
import { toast } from 'react-toastify'
import { Link, useHistory } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout'
import AuthContext from '@/contexts/authContext'
import api from '@/services/api'

export default function Figures() {
  const context = useContext(AuthContext);
  const history = useHistory()
  const [figures, setFigures] = useState(null);

  useEffect(() => {
    getData()
  }, [])


  async function getData(){
    try {
      context.setLoading(true);
      const {data:{figures}} = await api.get('/figures');
      setFigures(figures);
      context.setLoading(false);
    } catch (error) {
      context.setLoading(false);
      setFigures(null);
      toast.error('ops! Falha ao carregar Figurinhas!')
    }
  }

  return (
    <AppLayout>
      <div class="panel box-shadow-none content-header">
        <div class="panel-body">
          <div class="col-md-12">
              <h3 class="animated fadeInLeft">Figurinhas</h3>
              <p class="animated fadeInDown">
                Fogurinhas <span class="fa-angle-right fa"></span> Listagem
              </p>
          </div>
        </div>
      </div>

      <div className="col-md-12">
        <div className="panel">
          <div className="panel-heading">
            <h5><span style={{cursor:'pointer'}} className="fa fa-refresh" onClick={getData}> Atualizar</span></h5>
          </div>
          <div className="panel-body">
            <div className="responsive-table">
              <table id="datatables-example" className="table table-striped " width="100%" cellSpacing={0}>
                <thead>
                  <tr>
                    <th>Posição</th>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Pontação</th>
                    <th>opções</th>
                  </tr>
                </thead>
                <tbody>
                  {figures !== null ? (
                    figures.map(function(item){
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td><Link to={`figures/show/${item.id}`}>{item.name}</Link></td>
                          <td>{item.type.name}</td>
                          <td>{item.coin}</td>
                          <td>
                            <button className=" btn btn-circle btn-mn btn-primary" onClick={()=>history.push(`figures/edit/${item.id}`)}><span className="fa fa-edit"/></button>
                            <button className=" btn btn-circle btn-mn btn-danger" style={{marginLeft:10}} disabled><span className="fa fa-remove"/></button>
                          </td>
                        </tr>
                      )
                    })
                  ) : ( <h5 style={{color: 'red'}}>Nenhum registro</h5>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
     


    </AppLayout>
  )
}
