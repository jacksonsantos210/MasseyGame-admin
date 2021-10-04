import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import AuthContext from '@/contexts/authContext';
import AuthLayout from '@/layouts/AuthLayout';
import Loading from '@/components/Loading';
import '@/assets/css/login.css';
import LogoLogin from '@/assets/images/logo_login.png';

export default function LogIn() {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setFields((values) => ({
      ...fields,
      [key]: value,
    }));
  }

  async function handleLogin() {
    if (fields.email.length > 0 && fields.password.length > 0) {
      context.setLoading(true);
      try {
        const logged =  await context.Login(fields);
        if(logged === true){
          context.setLoading(false);
          history.push('/app')
        }
      } catch (error) {
        context.setLoading(false);
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Os campos e-mail e senha são obrigatórios!");
    }
  }


  return (
    <AuthLayout>
          { 
            context.loading === true ? (
              <Loading/>
            ):(
                <div className="card login-card" style={{marginTop: '5%'}}>
                  <div className="row no-gutters">
                    <div className="col-md-5">
                      <img src={LogoLogin} alt="login" className="login-card-img" />
                    </div>
                    <div className="col-md-7">
                      <div className="card-body">
                        <p className="login-card-description">Acessar sistema</p>
                        <form action="#!">
                          <div className="form-group">
                            <label htmlFor="email" className="sr-only">E-mail</label>
                            <input type="email" name="email"className="form-control" placeholder="E-mail" onChange={handleChange} value={fields.email}/>
                          </div>
                          <div className="form-group mb-4">
                            <label htmlFor="password" className="sr-only">Senha</label>
                            <input type="password" name="password" className="form-control" placeholder="Senha" onChange={handleChange} value={fields.password}/>
                          </div>
                          <button className="btn btn-block login-btn mb-4" onClick={handleLogin}>Login</button>
                        </form>
                        <a href="#!" className="forgot-password-link">Esqueceu a Senha?</a>
                        <p className="login-card-footer-text"></p>
                        <nav className="login-card-footer-nav">
                          <a href="#!"></a>
                          <a href="#!"></a>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
            )
          }

    </AuthLayout>

  )
}
