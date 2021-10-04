
import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AppLayout from '@/layouts/AppLayout';
import AuthContext from '@/contexts/authContext';
import api from '@/services/api';

export default function Passsword() {
  const { id } = useParams()
  const history = useHistory();
  const context = useContext(AuthContext);
  const [ fields, setFields ] = useState({password:"",confirm:""});
  
  const handleUpdate = async () => {
    if (validating() === true){
      try {
        context.setLoading(true);
        await api.post(`admins/change-password`,{password: fields.password});
        context.setLoading(false);
        toast.success('Senha alterada com sucesso!');
        history.replace('/app');
      } catch (error) {
        context.setLoading(false);
        toast.error('oops! Falha ao alterar Senha');
      }
    }
    
  }

  const validating = () => {
    let valid = true;
    if (fields.password.length <= 5) {
      toast.warning('Verifique o campo Nova senha.');
      valid = false;
    }
    if (fields.confirm.length <= 5) {
      toast.warning('Verifique o campo Confirmação.');
      valid = false;
    }
    if(valid === true){
      if(fields.password === fields.confirm) {
        return true;
      } else {
        toast.error('Os campos Nova Senha e Confirmação não coincidem.');
        return false;
      }
    } else {
      return false;
    }
  }
  
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setFields((values) => ({
      ...fields,
      [key]: value,
    }));
  }

  return (
    <AppLayout>
      <div class="panel box-shadow-none content-header">
        <div class="panel-body">
          <div class="col-md-12">
              <h3 class="animated fadeInLeft">Alterar Senha</h3>
              <p class="animated fadeInDown">
              Usuários <span class="fa-angle-right fa"></span> Alterar Senha
              </p>
          </div>
        </div>
      </div>
      <div>
        <div className="col-md-12 col-sm-12"> 
          <div className="col-md-12">
            <div className="panel box-v3">
              <div className="row">
                <div className="col-md-4 col-sm-12">
                  <div className="form-group">
                    <label for="password">Nova Senha</label>
                    <input type="password" id="password" name="password" className="form-control" onChange={handleChange} value={fields.password} aria-describedby="phoneInfluencer"/>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12">
                  <div className="form-group">
                    <label for="confirm">Confirmação</label>
                    <input type="password" id="confirm" name="confirm" className="form-control" onChange={handleChange} value={fields.confirm} aria-describedby="emailInfluencer"/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2 col-sm-12 align-self-end">
                  <div className="form-group">
                    <button type="button" className="btn btn-primary form-control" onClick={handleUpdate}>Salvar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}