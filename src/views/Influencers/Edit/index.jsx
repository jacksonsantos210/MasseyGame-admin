import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AppLayout from '@/layouts/AppLayout';
import AuthContext from '@/contexts/authContext';
import api from '@/services/api';

export default function InfluencersEdit() {
  const { id } = useParams()
  const history = useHistory();
  const context = useContext(AuthContext);
  const [ fields, setFields ] = useState({name:"",phone:"",email:""});
  

useEffect(() => {
    
  getData();
}, []);

async function getData(){
    try {
      context.setLoading(true);
      const { data: {influencer} } = await api.get(`influencers/show/${id}`);
      setFields({
        name:influencer.name,
        phone:influencer.phone,
        email:influencer.email
      });
      context.setLoading(false);
    } catch (error) {
      context.setLoading(false);
      toast.error('oops! Falha ao recuperar dados do Influencer');
    }
  }

  const handleUpdate = async () => {
    
    if (validating() === true){
      try {
        context.setLoading(true);
        await api.post(`influencers/update/${id}`,fields);
        context.setLoading(false);
        toast.success('Influencer atualizado com sucesso!');
        history.replace('/app/influencers');
      } catch (error) {
        context.setLoading(false);
        toast.error('oops! Falha ao atualizar Influencer');
      }
    }
    
  }

  const validating = () => {
    let valid = true;
    if (fields.name.length <= 0) {
      toast.warning('Verifique o campo Nome.');
      valid = false;
    }
    if (fields.phone.length <= 0) {
      toast.warning('Verifique o campo Telefone.');
      valid = false;
    }
    if (fields.email.length <= 0) {
      toast.warning('Verifique o campo E-mail.');
      valid = false;
    }
    return valid;
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
              <h3 class="animated fadeInLeft">Influenciadores</h3>
              <p class="animated fadeInDown">
              Influenciadores <span class="fa-angle-right fa"></span> Atualização
              </p>
          </div>
        </div>
      </div>
      <div>
        <div className="col-md-12 col-sm-12"> 
          <div className="col-md-12">
            <div className="panel box-v3">
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <div className="form-group">
                    <label for="name">Nome</label>
                    <input type="text" id="name" name="name" className="form-control" onChange={handleChange} value={fields.name} aria-describedby="nameInfluencer"/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-sm-12">
                  <div className="form-group">
                    <label for="phone">Telefone</label>
                    <input type="tel" id="phone" name="phone" className="form-control" onChange={handleChange} value={fields.phone} aria-describedby="phoneInfluencer"/>
                  </div>
                </div>
                <div className="col-md-8 col-sm-12">
                  <div className="form-group">
                    <label for="email">E-mail</label>
                    <input type="mail" id="email" name="email" className="form-control" onChange={handleChange} value={fields.email} aria-describedby="emailInfluencer"/>
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