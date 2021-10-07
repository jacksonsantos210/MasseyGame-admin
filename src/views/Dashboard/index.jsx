import React, {useContext} from 'react'
import AppLayout from '@/layouts/AppLayout'
import AuthContext from '@/contexts/authContext'
import PlayersCount from '@/components/PlayersCount/index'
import InfluencerTokens from '@/components/InfluencerTokens/index'



export default function Dashboard() {
  const context = useContext(AuthContext);


  return (
    <AppLayout>
      <div className="col-md-12" style={{padding: 20}}>
        <div className="col-md-6">
          <PlayersCount />      
        </div>
        <div className="col-md-6">
          <PlayersCount type="actives"/>      
        </div>
      </div>
      <div className="col-md-12" style={{padding: 20}}>
        <div className="col-md-6">
          <InfluencerTokens/>      
        </div>
        <div className="col-md-6">
          <InfluencerTokens type="used" />      
        </div>
      </div>
    </AppLayout>
  )
}
