import React from 'react'
import MenuItem from './MenuItem'
import Clock from '@/components/Clock';

export default function AsideLeft() {
 
  return (
    <div id="left-menu">
      <div className="sub-left-menu scroll">
        <ul className="nav nav-list">
          <li><div /* className="left-bg" */ style={{ height: 20}} /></li>
         {/*  <Clock/> */}
          <MenuItem label="Dashboard" route="" icon="fa-home"/>
          <MenuItem label="PLayers" route="players" icon="fa-gamepad"/>
          <MenuItem label="Seções Abertas" route="players/in-game" icon="fa-gamepad"/>
          <MenuItem label="Influencers" route="influencers" icon="fa-users"/>
          <MenuItem label="Indicações" route="Indications" icon="fa-puzzle-piece"/>
          <MenuItem label="Figurinhas" route="figures" icon="fa-id-card"/>
          {/* <MenuItem label="Videos" route="videos" icon="fa-video-camera" disabled={true}/> */}

        </ul>
      </div>
    </div>
  )
}
