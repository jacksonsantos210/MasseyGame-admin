import React from 'react';
import { BrowserRouter, Route,Redirect } from 'react-router-dom';

//Dashboard
import Dashboard from '@/views/Dashboard';
//Players
import Players from '@/views/Players/index';
import PlayersShow from '@/views/Players/Show';
//Influencers
import Influencers from '@/views/Influencers';
import InfluencersShow from '@/views/Influencers/Show';
import InfluencersInsert from '@/views/Influencers/Insert';
import InfluencersEdit from '@/views/Influencers/Edit';
//Influencers-Tokens
import InfluencersTokens from '@/views/InfluencersTokens';
import InfluencersTokensShow from '@/views/InfluencersTokens/Show';
import InfluencersTokensInsert from '@/views/InfluencersTokens/Insert';
import InfluencersTokensEdit from '@/views/InfluencersTokens/Edit';
//Figures
import Figures from '@/views/Figures/index'
import FiguresShow from '@/views/Figures/Show';
import FiguresEdit from '@/views/Figures/Edit';
//Logout
import LogOut from '@/views/Auth/LogOut';

const AppRoutes = () => {
 return (
   <BrowserRouter>
     <Route exact path="/" component={()=> <Redirect to="/app"/>} />
     <Route exact path="/app/" component={Dashboard} />
     <Route exact path="/app/players" component={Players} />
     <Route exact path="/app/players/show/:id" component={PlayersShow} />
     <Route exact path="/app/influencers" component={Influencers} />
     <Route exact path="/app/influencers/insert" component={InfluencersInsert} />
     <Route exact path="/app/influencers/edit/:id" component={InfluencersEdit} />
     <Route exact path="/app/influencers/show/:id" component={InfluencersShow} />
     <Route exact path="/app/influencers-tokens" component={InfluencersTokens} />
     <Route exact path="/app/influencers-tokens/insert" component={InfluencersTokensInsert} />
     <Route exact path="/app/influencers-tokens/edit/:id" component={InfluencersTokensEdit} />
     <Route exact path="/app/influencers-tokens/show/:id" component={InfluencersTokensShow} />
     <Route exact path="/app/figures" component={Figures} />
     <Route exact path="/app/figures/edit/:id" component={FiguresEdit} />
     <Route exact path="/app/figures/show/:id" component={FiguresShow} />
     
     <Route exact path="/app/sair" component={LogOut} />

   </BrowserRouter>
 );
};

export default AppRoutes;