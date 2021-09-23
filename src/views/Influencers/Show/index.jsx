import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AppLayout from '@/layouts/AppLayout';
import AuthContext from '@/contexts/authContext';
import api from '@/services/api';

export default function InfluencersShow() {
  const { id } = useParams();
  const history = useHistory();
  const context = useContext(AuthContext);
  const [ data, setData ] = useState(null);
  const [ table, setTable ] = useState(null);

  useEffect(() => {
    
    getData();
  }, []);

  async function getData(){
      try {
        context.setLoading(true);
        const { data: {influencer, tokens} } = await api.get(`influencers/show/${id}`);
        console.log(tokens);
        setData(influencer);
        setTable(tokens)
        context.setLoading(false);
      } catch (error) {
        console.error(error);
        context.setLoading(false);
        toast.error('oops! Falha ao recuperar dados do Jogador');
      }
    }

  return (
    <AppLayout>
       <div class="panel box-shadow-none content-header">
        <div class="panel-body">
          <div class="col-md-12">
              <h3 class="animated fadeInLeft">Influenciadores</h3>
              <p class="animated fadeInDown">
              Influenciadores <span class="fa-angle-right fa"></span> Detalhes
              </p>
          </div>
        </div>
      </div>
      {data === null ? (<h5>Carregando</h5>):(
      <div>
        
        <div className="col-md-12 col-sm-12"> 
          <div className="col-md-12">
            <div className="panel box-v3">
              
              <div className="row">
                <div className="col-md-11">
                  <h2>{data.name}</h2>
                </div>
                <div className="col-md-1">
                  <button className=" btn btn-circle btn-mn btn-primary" onClick={()=>history.goBack()}><span className="fa fa-undo"/></button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6"><h4><b>E-mail: </b>{data.email}  </h4></div>
                <div className="col-md-6"><h4><b>Telefone: </b>{data.phone}</h4></div>
              </div>
            
             
              
            </div>
            
          </div>
          
        </div>
        {table === null ? (<h5>Carregando</h5>):(
          <div className="col-md-12 col-sm-12"> 
            <div className="panel">
              <div className="panel-heading">
                <h5><span style={{cursor:'pointer'}} className="fa fa-refresh" onClick={getData}> Atualizar</span></h5>
              </div>
              <div className="panel-body"></div>
                <div className="responsive-table">
                  <table id="datatables-example" className="table table-striped " width="100%" cellSpacing={0}>
                    <thead>
                      <tr>
                        <th>TOKEN</th>
                        <th>Resgatado?</th>
                        <th>Resgatado Em</th>
                        <th>Figura</th>
                        <th>Jogador</th>
                        <th>Gerado em</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table !== null ? (
                        table.data.map(function(item){
                          return (
                            <tr key={item.id}>
                              <td><Link to={`/app/influencers-tokens/show/${item.token}`}>{item.token}</Link></td>
                              <td>{item.opened === true ? (<span style={{color:'green'}}>SIM</span>) : (<span style={{color:'red'}}>NÃO</span>)}</td>
                              <td>{item.opened_at !== null && moment(item.opened_at).format('DD/MM/YYYY')}</td>
                              <td>{item.opened === true && item.figure_id}</td>
                              <td>{item.player_id !== null && <Link to={`/app/players/show/${item.player.id}`}>{item.player.name}</Link>}</td>
                              <td>{moment(item.createdAt).format('DD/MM/YYYY')}</td>
                            </tr>
                          )
                        })
                      ) : ( <h5 style={{color: 'red'}}>Nenhum registro</h5>)}
                    </tbody>
                  </table>
                </div>
              </div>
          </div> 
        )}

        <div className="col-md-12 col-sm-12 profile-v1-wrapper">
  
          <div className="col-md-3 col-sm-12 padding-0 profile-v1-right">
            <div className="col-md-6 col-sm-4 profile-v1-right-wrap padding-0">
              <div className="col-md-12 padding-0 sub-profile-v1-right text-center sub-profile-v1-right1">
                
              </div>
            </div>
            <div className="col-md-6 col-sm-4 profile-v1-right-wrap padding-0" >
              <div className="col-md-12 sub-profile-v1-right text-center sub-profile-v1-right2">
                
              </div>
            </div>
            <div className="col-md-12 col-sm-4 profile-v1-right-wrap padding-0">
              <div className="col-md-12 sub-profile-v1-right text-center sub-profile-v1-right3">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </AppLayout>
  )
}
