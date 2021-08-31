import React, { useContext } from 'react';
import Navbar from "@/components/Navbar"
import AsideLeft from '@/components/AsideLeft'
import AuthContext from '@/contexts/authContext'
import Loading from '../../components/Loading/index'
/* import {} from './styles'; */

export default function AppLayout ( { children } ) {
  const context = useContext(AuthContext);

  return (
    <React.Fragment>
      { context.loading === true && <Loading/> }
         
      <div id="mimin" class="dashboard">
        <Navbar/>
        <div className="container-fluid mimin-wrapper">    
          <AsideLeft />
          <div id="content">
            {children}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
