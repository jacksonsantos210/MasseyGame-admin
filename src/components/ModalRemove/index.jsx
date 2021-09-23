import React from 'react'
import '@/assets/css/app.css';

export default function ModalRemove({close, execute, children}) {

  return (
    <div id="myModal" className="modalApp">
        <div  className="modalCard">
          <div className="modalApp-content">
            <div className="modal-header" style={{backgroundColor:"#E43927", color:'white'}}>
              <span className="close" onClick={close}>×</span>
              <h4 className="modal-title">Remover Registro?</h4>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer " style={{backgroundColor:"#E43927", color:'white'}}>
             <div className="d-grid gap-2 d-md-block">
                <button className="btn btn-default" onClick={close}>NÃO</button>
                <button className="btn btn-primary" onClick={execute}>SIM</button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
  )
}
