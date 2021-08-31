import React, { useEffect, useContext } from 'react'
import AuthContext from '@/contexts/authContext'

export default function LogOut() {
  const {Logout} = useContext(AuthContext);
  useEffect(() => {
    async function executeLogout(){
      await Logout()
    }
    executeLogout()
  }, [])


  return (
    <div>
      <h4 style={{paddingLeft: 15}}>Desconectando...</h4>
    </div>
  )
}
