import React, {useState, useEffect} from 'react'
import moment from 'moment';

export default function Clock() {
  const [clock,setClock]=useState();

  useEffect(() => {
    function setTimer(){
      setInterval(function(){
          let timer = new Date();
          let h = timer.getHours();
          let m = timer.getMinutes();
          m = zero(m);
          setClock(`${h}:${m}`)
          "document.getElementById('clock').textContent = h+':'+m;"
      },1000)
    }
    setTimer()
  }, [])

  function zero(x) {
    if (x < 10) {
        x = '0' + x;
    } return x;
  }

  return (
    <li className="time">
      <h1 id="clock" className="animated fadeInLeft">{clock}</h1>
      <p className="animated fadeInRight">{moment().format('D [de] MMMM [de] YYYY')}</p>
    </li>
  )
}
