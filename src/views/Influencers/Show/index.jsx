import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AppLayout from '@/layouts/AppLayout';
import AuthContext from '@/contexts/authContext';
import api from '@/services/api';
import ModalGenerateToken from '@/components/ModalGenerateToken'

export default function InfluencersShow() {
  const { id } = useParams();
  const history = useHistory();
  const context = useContext(AuthContext);
  const [ data, setData ] = useState(null);
  const [ table, setTable ] = useState(null);
  const [ generateDialog, setGenerateDialog ] = useState(false);

  useEffect(() => {
    
    getData();
  }, []);

  async function getData(){
      try {
        context.setLoading(true);
        const { data: {influencer, tokens} } = await api.get(`influencers/show/${id}`);
        setData(influencer);
        setTable(tokens)
        context.setLoading(false);
      } catch (error) {
        context.setLoading(false);
        toast.error('oops! Falha ao recuperar dados do Jogador');
      }
    }

    async function handleGenerate(){
      try {
        context.setLoading(true);
        const data = await api.post(`/influencers-tokens/insert`,{
          influencer_id: id
        });
        setGenerateDialog(false);
        await getData();
        context.setLoading(false);
      } catch (error) {
        context.setLoading(false);
        toast.error('oops! Falha ao gerar Token para este influencer');
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
        {table === null ? (<h5>Carregando</h5>):(
          <div className="col-md-12 col-sm-12"> 
            <div className="panel">
              <div className="panel-heading">
                <h5>
                  <span style={{cursor:'pointer'}} className="fa fa-refresh" onClick={getData}> Atualizar</span>
                  <div className="col-md-11 col-sm-3">
                    <span style={{cursor:'pointer'}} className="fa fa-plus" onClick={()=> {setGenerateDialog(true)}}> Novo</span>
                  </div>  
                </h5>
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
                              <td>{item.token}</td>
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
      </div>
    )}
    {generateDialog === true && (
      <ModalGenerateToken execute={handleGenerate} close={()=>{
      setGenerateDialog(false);
      }}>
        <h4><b>Para o Influencer:</b> {data?.name}</h4>
      </ModalGenerateToken>
    )} 
    </AppLayout>
  )
}
