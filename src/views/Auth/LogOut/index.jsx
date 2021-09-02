import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '@/contexts/authContext'

export default function LogOut() {
  const { Logout } = useContext(AuthContext);
  const history = useHistory()
  useEffect(() => {
    async function executeLogout(){
      const exit = await Logout();
      if (exit === true) {
        history.replace('/login');
      }
    }
    executeLogout()
  }, [])


  return (
    <div>
      <h4 style={{paddingLeft: 15}}>Desconectando...</h4>
    </div>
  )
}
