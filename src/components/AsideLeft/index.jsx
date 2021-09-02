import React from 'react'
import MenuItem from './MenuItem'
import Clock from '@/components/Clock';

export default function AsideLeft() {
 
  return (
    <div id="left-menu">
      <div className="sub-left-menu scroll">
        <ul className="nav nav-list">
          {/* <li><div className="left-bg" /></li> */}
          <Clock/>
          <MenuItem label="Dashboard" route="" icon="fa-home"/>
          <MenuItem label="PLayers" route="players" icon="fa-gamepad"/>
          <MenuItem label="Influencers" route="influencers" icon="fa-users"/>
          <MenuItem label="Tokens" route="influencers-tokens" icon="fa-puzzle-piece"/>
          <MenuItem label="Figurinhas" route="figures" icon="fa-id-card"/>
          <MenuItem label="Videos" route="videos" icon="fa-video-camera"/>

        </ul>
      </div>
    </div>
  )
}