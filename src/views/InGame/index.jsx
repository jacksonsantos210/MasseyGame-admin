import React, {useState, useEffect, useContext} from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Link } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import AuthContext from '@/contexts/authContext';
import api from '@/services/api';
import {
  Pagination,
  ListPagination,
  PaginationBox,
} from "@/components/Paginations/style";

export default function InGame() {
  const context = useContext(AuthContext);
  const [players, setPlayers] = useState(null);
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
      const {data:{players}} = await api.get(`/players/ingame?page=${nextPage}`);
      setPlayers(players.data);
      setInfo({
        pages: players.pages,
        actual: players.actual,
        size: players.size,
      }); 
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
                Jogadores <span class="fa-angle-right fa"></span> Seções em aberto
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
                    <th>Cadastrou-se em </th>
                    <th>Abertura da seção</th>
                  </tr>
                </thead>
                <tbody>
                  {players !== null ? (
                    players.map(function(item){
                      return (
                        <tr key={item.id}>
                          <td><Link to={`players/show/${item.player.id}`}>{item.player.name}</Link></td>
                          <td>{item.player.email}</td>
                          <td>{item.player.country}</td>
                          <td>{item.player.provincy}</td>
                          <td>{item.player.city}</td>
                          <td>{moment(item.player.createdAt).format('DD/MM/yyyy')}</td>
                          <td>{`${moment(item.createdAt).format('DD/MM/yyyy')} às ${moment(item.createdAt).format('H:mm')}`}</td>
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
     


    </AppLayout>
  )
}
