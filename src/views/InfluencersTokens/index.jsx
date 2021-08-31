import React, {useState, useEffect, useContext} from 'react'
import { toast } from 'react-toastify'
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout'
import AuthContext from '@/contexts/authContext'
import api from '@/services/api'

export default function InfluencersTokens() {
  const context = useContext(AuthContext);
  const history = useHistory();
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    getData()
  }, [])


  async function getData(){
    try {
      context.setLoading(true);
      const { data } = await api.get('/influencers-tokens');
      setTokens(data.tokens);
      context.setLoading(false);
    } catch (error) {
      context.setLoading(false);
      setTokens(null);
      toast.error('ops! Falha ao carregar tokens de Influenciadores!')
    }
  }

  return (
    <AppLayout>
      <div class="panel box-shadow-none content-header">
        <div class="panel-body">
          <div class="col-md-12">
              <h3 class="animated fadeInLeft">Influencers</h3>
              <p class="animated fadeInDown">
                Influencers <span class="fa-angle-right fa"></span> Listagem
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
                    <th>Influencer</th>
                    <th>Token</th>
                    <th>Aberto</th>
                    <th>Gerado em</th>
                    <th>opções</th>
                  </tr>
                </thead>
                <tbody>
                  {tokens !== null ? (
                    tokens.map(function(item){
                      return (
                        <tr key={item.id}>
                          <td><Link to={`influencers/show/${item.influencer.id}`}>{item.influencer.name}</Link></td>
                          <td><Link to={`influencers-tokens/show/${item.token}`}>{item.token}</Link></td>
                          <td>{item.opened === true ? (<span style={{fontWeight: 'bold',color:'#27C24C'}}>SIM</span>):(<span style={{fontWeight: 'bold',color:'#E43927'}}>NÃO</span>)}</td>
                          <td>{moment(item.createdAt).format('DD/MM/yyyy')}</td>
                          <td>
                            <button className=" btn btn-circle btn-mn btn-primary" onClick={()=>history.push(`influencers-tokens/edit/${item.token}`)}><span className="fa fa-edit"/></button>
                            <button className=" btn btn-circle btn-mn btn-danger" style={{marginLeft:10}}><span className="fa fa-remove"/></button>
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
