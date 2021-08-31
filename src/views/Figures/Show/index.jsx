import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AppLayout from '@/layouts/AppLayout'
import AuthContext from '@/contexts/authContext';
import api from '@/services/api';

export default function FiguresShow() {
  const {id} = useParams();
  const context = useContext(AuthContext);
  const [ player, setPlayer ] = useState(null);

  useEffect(() => {
    async function getData(){
      try {
        context.setLoading(true);
        const { data } = await api.get(`players/show/${playerID}`);
        console.log(data);
        //setPlayer(data.player);
        context.setLoading(false);
      } catch (error) {
        console.error(error);
        context.setLoading(false);
        toast.error('oops! Falha ao recuperar dados do Jogador');
      }
    }
    getData();
  }, [])

  return (
    <AppLayout>
      
    </AppLayout>
  )
}
