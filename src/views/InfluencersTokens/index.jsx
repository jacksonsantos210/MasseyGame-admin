import React, {useState, useEffect, useContext} from 'react'
import { toast } from 'react-toastify'
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout'
import AuthContext from '@/contexts/authContext'
import ModalRemove from '@/components/ModalRemove';
import ModalItentity from '@/components/ModalItentity';
import ModalGenerateToken from '@/components/ModalGenerateToken';
import api from '@/services/api'

export default function InfluencersTokens() {
  const context = useContext(AuthContext);
  const history = useHistory();
  const [tokens, setTokens] = useState(null);
  const [influencers, setInfluencers] = useState(null);
  const [removeItem, setRemoveItem] = useState(null);
  const [removeDialog, setRemoveDialog] = useState(false);
  const [ identityDialog, setIdentityDialog ] = useState(false);
  const [generateItem, setGenerateItem] = useState(null);
  const [generateDialog, setGenerateDialog] = useState(false);

  useEffect(() => {
    getData();
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

  async function openIdentityDialog(){
    try {
      context.setLoading(true);
      const {data:{influencers}} = await api.get('/influencers');
      setInfluencers(influencers);
      setIdentityDialog(true);
      context.setLoading(false);
    } catch (error) {
      context.setLoading(false);
      setTokens(null);
      toast.error('ops! Falha ao carregar tokens de Influenciadores!')
    }
  }

  async function handleRemove(){
    try {
      context.setLoading(true);
      const data = await api.post(`/influencers-tokens/delete/${removeItem.id}`);
      context.setLoading(false);
      toast.success('Token removido com sucesso!')
      getData();
    } catch (error) {
      context.setLoading(false);
      setInfluencer(null);
      toast.error('ops! Falha ao remover Token!')
    }
    setRemoveItem(null);
    setRemoveDialog(false);
  }

  async function handleGenerate(){
    try {
      context.setLoading(true);
      const data = await api.post(`/influencers-tokens/insert`,{
        influencer_id: generateItem
      });
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
              <h3 class="animated fadeInLeft">Tokens</h3>
              <p class="animated fadeInDown">
                Influencers <span class="fa-angle-right fa"></span> Tokens <span class="fa-angle-right fa"></span> Listagem
              </p>
          </div>
        </div>
      </div>

      <div className="col-md-12">
        <div className="panel">
          <div className="panel-heading">
            <h5>
              <span style={{cursor:'pointer'}} className="fa fa-refresh" onClick={getData}> Atualizar</span>
              <div className="col-md-11 col-sm-3">
                <span style={{cursor:'pointer'}} className="fa fa-plus" onClick={openIdentityDialog}> Novo</span>
              </div>    
            </h5>
          </div>
          <div className="panel-body">
            <div className="responsive-table">
              <table id="datatables-example" className="table table-striped " width="100%" cellSpacing={0}>
                <thead>
                  <tr>
                    <th>Influencer</th>
                    <th>Token</th>
                    <th>Resgatado</th>
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
                          <td>{item.token}</td>
                          <td>{item.opened === true ? (<span style={{fontWeight: 'bold',color:'#27C24C'}}>SIM</span>):(<span style={{fontWeight: 'bold',color:'#E43927'}}>NÃO</span>)}</td>
                          <td>{moment(item.createdAt).format('DD/MM/yyyy')}</td>
                          <td>
                            <button className=" btn btn-circle btn-mn btn-danger" onClick={()=>{
                              setRemoveItem(item);
                              setRemoveDialog(true);
                            }} style={{marginLeft:10}}
                            disabled={item.opened}><span className="fa fa-remove" /></button>
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
      {removeDialog === true && (
       <ModalRemove execute={handleRemove} close={()=>{
        setRemoveItem(null);
        setRemoveDialog(false);
       }}>
         <h4><b>Token:</b> {removeItem?.token}</h4>
         <h4><b>do Influencer:</b> {removeItem?.influencer.name}</h4>
       </ModalRemove>
     )} 
      {generateDialog === true && (
        <ModalGenerateToken execute={handleGenerate} close={()=>{
        setGenerateDialog(false);
        }}>
          <h4><b>Para o Influencer:</b> {data?.name}</h4>
        </ModalGenerateToken>
      )}    
      {identityDialog === true && (
        <ModalItentity execute={()=>{ 
          setIdentityDialog(false);
          handleGenerate();  
        }} close={()=>{
        setIdentityDialog(false);
        }}>
          <select className="form-control" onChange={(e)=>{ 
            setGenerateItem(e.target.value); 
          }}>
            {influencers?.map(function(obj){
              return (
                <option value={obj.id}>{obj.name}</option>
              )
            })}
          </select>
        </ModalItentity>
      )}   
    </AppLayout>
  )
}
