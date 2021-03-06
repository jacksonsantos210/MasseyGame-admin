import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '@/contexts/authContext'
import UserAvatar from '@/assets/images/user.png'
import LogoSmall from '@/assets/images/logo_small.png'

export default function Navbar() {
  const { user } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-default header navbar-fixed-top">
      <div className="col-md-12 nav-wrapper">
        <div className="navbar-header" style={{width: '100%'}}>
           {/* <div className="opener-left-menu is-open">
            <span className="top" />
            <span className="middle" />
            <span className="bottom" />
          </div>  */}
          <a href="index.html" className="navbar-brand"> 
            <span><img src={LogoSmall} alt="logo" height={25}/><b style={{marginLeft: 10}}>Massey Game - Admin</b></span>
          </a>
          <ul className="nav navbar-nav navbar-right user-nav">
            <li className="user-name"><span>{user?.name}</span></li>
            <li className="dropdown avatar-dropdown">
              <img src={UserAvatar} className="img-circle avatar" style={{marginRight: 10}} alt="user name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" />
              <ul className="dropdown-menu user-dropdown">
              <li><Link to="/app/profile"><span className="fa fa-user" /> Meu Perfil</Link></li>
              <li><Link to="/app/password"><span className="fa fa-user" /> Alterar Senha</Link></li>
                <li className="more">
                  <ul>
                    <li><Link to="/app/logout"><span className="fa fa-power-off" /> Sair</Link></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
