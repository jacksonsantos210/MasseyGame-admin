import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import AuthContext from '@/contexts/authContext';
import AuthLayout from '@/layouts/AuthLayout';
import Loading from '@/components/Loading';
import {LoginPanel} from "./styles";
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
      <div className="container">
        <div className="form-signin">
          { 
            context.loading === true ? (
              <Loading/>
            ):(
              <LoginPanel>
                <div className="panel-body text-center">
                  <img src={LogoLogin} alt="logo"/>
                  <p className="atomic-mass"></p>
                  <p className="element-name">Painel administrativo</p>
                
                  <div className="form-group form-animate-text" style={{marginTop: '30px !important'}}>
                    <input type="email" className="form-text" name="email" required onChange={handleChange}/>
                    <span className="bar" />
                    <label>Usuário</label>
                  </div>
                  <div className="form-group form-animate-text" style={{marginTop: '30px !important'}}>
                    <input type="password" className="form-text" name="password" required onChange={handleChange}/>
                    <span className="bar" />
                    <label>Senha</label>
                  </div>
                  <label className="pull-left">
                    <input type="checkbox" className="icheck pull-left" name="checkbox1" /> Lembrar de mim
                  </label>
                  <button type="submit" className="btn col-md-12" onClick={handleLogin}>Entrar</button>
                </div>
                <div className="text-center" >
                  <a href="forgotpass.html">Esqueceu sua senha?</a>
                </div>
              </LoginPanel>
            )
          }
          </div>
      </div>
    </AuthLayout>

  )
}
