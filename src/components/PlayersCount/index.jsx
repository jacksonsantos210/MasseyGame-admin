import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import api from '@/services/api';

export default function PlayersCount() {
  const [players, setPlayers] = useState(0);

  useEffect(() => {
    async function getData(){
      try {
        const {data:{players}} = await api.get('/players');
        setPlayers(players.size);
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
          <h4 className="text-left">Jogadores</h4>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-6 text-right">
          <h4>
            <span className="icon-user icons icon text-right" />
          </h4>
        </div>
      </div>
      <div className="panel-body text-center">
        <h1>{players}</h1>
        <p>Jogadores Ativos</p>
        <hr />
        <span><Link to="/app/players">Ver mais</Link></span>
      </div>
    </div>
  )
}
