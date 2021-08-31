import React from 'react'

export default function Brandcumb({title = "Dashboard" , maper = null}) {
  return (
   <div id="content">
  <div className="panel box-shadow-none content-header">
    <div className="panel-body">
      <div className="col-md-12">
        <h3 className="animated fadeInLeft">{title}</h3>
        <p className="animated fadeInDown">
          { maper !== null ? (
            <React.Fragment>
              {maper.map(function(obj){
                return (<label key={obj}>{obj} <span className="fa-angle-right fa" /></label>)
              })}
              
            </React.Fragment>
                     
          ): ({title})}
        </p>
      </div>
    </div>
  </div>
</div>

  )
}
