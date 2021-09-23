import React, {useState, useEffect, useContext} from 'react'
import { toast } from 'react-toastify'
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
import ModalRemove from '@/components/ModalRemove';
import '@/assets/css/app.css';
import AppLayout from '@/layouts/AppLayout';
import AuthContext from '@/contexts/authContext';
import api from '@/services/api';



export default function Influencers() {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [influencers, setInfluencer] = useState(null);
  const [removeItem, setRemoveItem] = useState(null);
  const [removeDialog, setRemoveDialog] = useState(false);


  useEffect(() => {
    getData()
  }, [])


  async function getData(){
    try {
      context.setLoading(true);
      const {data:{influencers}} = await api.get('/influencers');
      setInfluencer(influencers);
      context.setLoading(false);
    } catch (error) {
      context.setLoading(false);
      setInfluencer(null);
      toast.error('ops! Falha ao carregar Influenciadores!')
    }
  }

  async function handleRemove(){

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
            <h5>
              <span style={{cursor:'pointer'}} className="fa fa-refresh" onClick={getData}> Atualizar</span>
              <div className="col-md-11 col-sm-3">
                <span style={{cursor:'pointer'}} className="fa fa-plus" onClick={()=> history.push('/app/influencers/insert')}> Novo</span>
              </div>

            </h5>
          </div>
          <div className="panel-body">
            <div className="responsive-table">
              <table id="datatables-example" className="table table-striped " width="100%" cellSpacing={0}>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Cadastrado em</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {influencers !== null ? (
                    influencers.map(function(item){
                      return (
                        <tr key={item.id}>
                          <td><Link to={`influencers/show/${item.id}`}>{item.name}</Link></td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>{moment(item.createdAt).format('DD/MM/yyyy')}</td>
                          <td>
                            <button className=" btn btn-circle btn-mn btn-primary" onClick={()=>history.push(`influencers/edit/${item.id}`)}><span className="fa fa-edit"/></button>
                            <button className=" btn btn-circle btn-mn btn-danger" onClick={()=>{
                              setRemoveItem(item);
                              setRemoveDialog(true);
                            }} style={{marginLeft:10}}><span className="fa fa-remove"/></button>
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
         <h4><b>Influencer:</b> {removeItem?.name}</h4>
       </ModalRemove>
     )}               
    </AppLayout>
  )
}
