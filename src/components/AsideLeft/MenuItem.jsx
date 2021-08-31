import React from 'react'
import { Link } from 'react-router-dom';

export default function MenuItem({label,route, icon}) {
  return ( <li><Link to={`/app/${route}`}><span className={`${icon} fa`} /> {label}</Link></li> )
}
