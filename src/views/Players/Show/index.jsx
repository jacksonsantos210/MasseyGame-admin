import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import { useHistory, useParams } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout'
import AuthContext from '@/contexts/authContext';
import api from '@/services/api';

import UserImage from '@/assets/images/user.png';

export default function PlayersShow() {
  const { id } = useParams();
  const history = useHistory();
  const context = useContext(AuthContext);
  const [ player, setPlayer ] = useState(null);

  useEffect(() => {
    async function getData(){
      try {
        context.setLoading(true);
        const { data } = await api.get(`players/show/${id}`);
        console.log(data);
        setPlayer(data.player);
        context.setLoading(false);
      } catch (error) {
        console.error(error);
        context.setLoading(false);
        toast.error('oops! Falha ao recuperar dados do Jogador');
      }
    }
    getData();
  }, []);

  return (
    <AppLayout>
       <div class="panel box-shadow-none content-header">
        <div class="panel-body">
          <div class="col-md-12">
              <h3 class="animated fadeInLeft">Jogadores</h3>
              <p class="animated fadeInDown">
                Jogadores <span class="fa-angle-right fa"></span> Detalhes
              </p>
          </div>
        </div>
      </div>
      {player === null ? (<h5>Carregando</h5>):(
      <div>
        
        <div className="col-md-12 col-sm-12"> 
          <div className="col-md-12">
            <div className="panel box-v3">
              
              <div className="row">
                <div className="col-md-11">
                  <h2>{player.name}</h2>
                </div>
                <div className="col-md-1">
                  <button className=" btn btn-circle btn-mn btn-primary" onClick={()=>history.goBack()}><span className="fa fa-undo"/></button>
                </div>
                
              </div>
              <div className="row">
                <div className="col-md-6"><h4><b>E-mail: </b>{player.email}  </h4></div>
                <div className="col-md-6"><h4><b>Telefone: </b>{player.phone}</h4></div>
              </div>
              <div className="row">
                <div className="col-md-3"><h4><b>País: </b>{player.country}  </h4></div>
                <div className="col-md-3"><h4><b>Estado: </b>{player.provincy}</h4></div>
                <div className="col-md-5"><h4><b>Município: </b>{player.city}</h4></div>
              </div>
              <div className="row">
                <div className="col-md-12"> <h4><b>Endereço: </b>{player.address} </h4></div>
              </div>
              
            </div>
            
          </div>
          
        </div>

        <div className="col-md-12 col-sm-12"> 
          <div className="col-md-3">
            <div className="panel box-v3 text-center">
                <h1>{player.score}</h1>
                <p>Pontos</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="panel box-v3 text-center">
            <h1>{player.cash}</h1>
                <p>Saldo</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="panel box-v3 text-center">
                <h1>0</h1>
                <p>Vídeos</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="panel box-v3 text-center">
            <h1>0</h1>
                <p>Tempo de Jogo</p>
            </div>
          </div>
        </div>


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
