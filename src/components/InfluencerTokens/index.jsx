import React, { useEffect, useState } from 'react'
import api from '@/services/api';

export default function InfluencerToken({type = "general"}) {
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    async function getData(){
      try {
        if (type === "general"){
          const general = await api.get('/influencers');
          setTokens(general.data.influencers.length);

        } else {
          const useds = await api.get('/influencers-tokens/useds');
          setTokens(useds.data.tokens.length);
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
          <h4 className="text-left">Influencers</h4>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-6 text-right">
          <h4>
            <span className="icon-basket-loaded icons icon text-right" />
          </h4>
        </div>
      </div>
      <div className="panel-body text-center">
        <h1>{tokens}</h1>
        <p>Tokens utilizados</p>
        <hr />
      </div>
    </div>
  )
}
