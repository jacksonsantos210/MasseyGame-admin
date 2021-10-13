import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import api from '@/services/api';

export default function PlayersCount({type = "general"}) {
  const [players, setPlayers] = useState(0);

  useEffect(() => {
    async function getData(){
      try {
        if (type === "general"){
          const {data: {players:general}} = await api.get('/players');
          setPlayers(general.size);
        } else {
          const {data:{players:activeds}} = await api.get('/players/ingame');
          console.log(activeds);
          setPlayers(activeds.size);
        }
      } catch (error) {
        console.error(error)
      }




      
    }
    getData()
  }, [])


  return (
    <div className="panel box-v1">
      <div className="panel-heading bg-white border-none">
        <div className="col-md-6 col-sm-6 col-xs-6 text-left padding-0">
          {type==="general" ? (<h4  className="text-left">Jogadores Existentes</h4>):(<h4  className="text-left">Seções Ativas</h4>)}
          {/* s */}
        </div>
        <div className="col-md-6 col-sm-6 col-xs-6 text-right">
          <h4>
            <span className="icon-user icons icon text-right" />
          </h4>
        </div>
      </div>
      <div className="panel-body text-center">
        <h1>{players}</h1>
        {/* {type==="general" ? (<p>Jogadores Existentes</p>):(<p>Jogadores Ativos</p>)} */}
        <hr />
        <span>{type==="general" ? (<Link to="/app/players">Ver mais</Link>) : (<Link to="/app/players/in-game">Ver mais</Link>)}    </span>
      </div>
    </div>
  )
}
