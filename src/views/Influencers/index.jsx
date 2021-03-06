import React, {useState, useEffect, useContext} from 'react'
import { toast } from 'react-toastify'
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
import ModalRemove from '@/components/ModalRemove';
import '@/assets/css/app.css';
import AppLayout from '@/layouts/AppLayout';
import AuthContext from '@/contexts/authContext';
import api from '@/services/api';
import {
  Pagination,
  ListPagination,
  PaginationBox,
} from "@/components/Paginations/style";



export default function Influencers() {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [influencers, setInfluencer] = useState(null);
  const [removeItem, setRemoveItem] = useState(null);
  const [removeDialog, setRemoveDialog] = useState(false);
  const [nextPage, setNextPage] = useState(1);

  const MAX_ITEMS = 3;
  const MAX_LEFT = (MAX_ITEMS - 1) / 2;

  const [info, setInfo] = useState({
    pages: 1,
    actual: 1,
    size: 0,
  });
  const first = Math.max(info.actual - MAX_LEFT, 1);


  useEffect(() => {
    getData()
  }, [nextPage])


  async function getData(){
    try {
      context.setLoading(true);
      const {data:{influencers}} = await api.get(`/influencers?page=${nextPage}`);
      setInfo({
        pages: influencers.pages,
        actual: influencers.actual,
        size: influencers.size,
      });
      setInfluencer(influencers.data);
      context.setLoading(false);
    } catch (error) {
      context.setLoading(false);
      setInfluencer(null);
      toast.error('ops! Falha ao carregar Influenciadores!')
    }
  }

  async function handleRemove(){
    try {
      context.setLoading(true);
      const data = await api.post(`/influencers/delete/${removeItem.id}`);
      context.setLoading(false);
      toast.success('Influencer removido com sucesso!')
      getData();
    } catch (error) {
      context.setLoading(false);
      setInfluencer(null);
      toast.error('ops! Falha ao remover Influenciador!')
    }
    setRemoveItem(null);
    setRemoveDialog(false);
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
                    <th>Tag</th>
                    <th>Indica????es</th>
                    <th>Cadastrado em</th>
                    <th>A????es</th>
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
                          <td>{item.token}</td>
                          <td>{item.indications}</td>
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
              <Pagination>
                  <PaginationBox>
                    <button
                      className="PaginationBtn"
                      onClick={() => setNextPage(info.actual - 1)}
                      disabled={info.actual === 1}
                    >
                      {`<--`}
                    </button>
                    {Array.from({ length: Math.min(MAX_ITEMS, info.pages) })
                      .map((_, index) => index + first)
                      .map((page) => (
                        <ListPagination key={page}>
                          <button
                            onClick={() => setNextPage(info.pages)}
                            className={
                              page === nextPage
                                ? "pagination__item--active"
                                : null
                            }
                          >
                            {page}
                          </button>
                        </ListPagination>
                      ))}

                    <button
                      className="PaginationBtn"
                      onClick={() => setNextPage(info.actual + 1)}
                      disabled={info.actual === info.pages}
                    >
                      {`-->`}
                    </button>
                  </PaginationBox>
                </Pagination>
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
