import React from 'react'
import { Link } from 'react-router-dom';

export default function MenuItem({label,route, icon, disabled=false}) {
  return ( <li><Link to={disabled === false ? `/app/${route}` : '#'}><span className={`${icon} fa`} />{label} {disabled === true && (<span className="fa fa-lock"/>)}  </Link></li> )
}
