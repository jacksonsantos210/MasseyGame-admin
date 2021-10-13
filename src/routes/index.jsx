import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Dashboard from '@/views/Dashboard/index'
import Players from '@/views/Players/index'
import PlayersShow from '@/views/Players/Show';
import Influencers from '@/views/Influencers/index'
import InfluencersInsert from '@/views/Influencers/Insert';
import InfluencersEdit from '@/views/Influencers/Edit';
import InfluencersShow from '@/views/Influencers/Show';
import Indications from '@/views/Indications/index';
import InGame from '@/views/InGame/index';
import Figures from '@/views/Figures/index';
import LogIn from '@/views/Auth/LogIn/index';
import LogOut from '@/views/Auth/LogOut/index';
import Profile from '@/views/Profile/index';
import Password from '@/views/Password/index';

import { isAuthenticated } from "@/services/auth";


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={()=> <Redirect to="/app"/>} />
      <PrivateRoute exact path="/app" component={Dashboard} />
      <PrivateRoute exact path="/app/profile" component={Profile} />
      <PrivateRoute exact path="/app/password" component={Password} />
      <PrivateRoute exact path="/app/players" component={Players} />
      <PrivateRoute exact path="/app/players/show/:id" component={PlayersShow} />
      <PrivateRoute exact path="/app/players/in-game" component={InGame} />
      <PrivateRoute exact path="/app/influencers" component={Influencers} />
      <PrivateRoute exact path="/app/influencers/insert" component={InfluencersInsert} />
      <PrivateRoute exact path="/app/influencers/edit/:id" component={InfluencersEdit} />
      <PrivateRoute exact path="/app/influencers/show/:id" component={InfluencersShow} />
      <PrivateRoute exact path="/app/indications" component={Indications} />
      <PrivateRoute exact path="/app/figures" component={Figures} />
      <Route exact path="/login" component={LogIn} />
      <PrivateRoute exact path="/app/logout" component={LogOut} />
      <Route path="*" component={() => <Redirect to="/" />} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
