import React, {useState, useEffect, useContext} from 'react'
import { toast } from 'react-toastify'
import moment from 'moment';
import { Link } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout'
import AuthContext from '@/contexts/authContext'
import api from '@/services/api'

export default function Players() {
  const context = useContext(AuthContext);
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    getData()
  }, [])


  async function getData(){
    try {
      context.setLoading(true);
      const {data:{players}} = await api.get('/players');
      setPlayers(players.rows);
      context.setLoading(false);
    } catch (error) {
      context.setLoading(false);
      setPlayers(null);
      toast.error('oops! Falha ao carregar Jogadores!')
    }
  }

  return (
    <AppLayout>
      <div class="panel box-shadow-none content-header">
        <div class="panel-body">
          <div class="col-md-12">
              <h3 class="animated fadeInLeft">Jogadores</h3>
              <p class="animated fadeInDown">
                Jogadores <span class="fa-angle-right fa"></span> Listagem
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
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>País</th>
                    <th>Estado</th>
                    <th>Município</th>
                    <th>Cadastrou em </th>
                  </tr>
                </thead>
                <tbody>
                  {players !== null ? (
                    players.map(function(item){
                      return (
                        <tr key={item.id}>
                          <td><Link to={`players/show/${item.id}`}>{item.name}</Link></td>
                          <td>{item.email}</td>
                          <td>{item.country}</td>
                          <td>{item.provincy}</td>
                          <td>{item.city}</td>
                          <td>{moment(item.createdAt).format('DD/MM/yyyy')}</td>
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
