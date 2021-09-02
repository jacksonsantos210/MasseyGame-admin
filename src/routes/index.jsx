/* import React, {useContext} from 'react';
import AuthContext from '@/contexts/authContext';

import AuthRoutes from './AuthRoutes';
import AppRoutes from './AppRoutes';

const Routes = () => {
  const { signed } = useContext(AuthContext);
  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
 */
import Dashboard from '../views/Dashboard/index'
import Players from '../views/Players/index'
import PlayersShow from '@/views/Players/Show';
import Influencers from '../views/Influencers/index'
import InfluencersInsert from '@/views/Influencers/Insert';
import InfluencersEdit from '@/views/Influencers/Edit';
import InfluencersShow from '@/views/Influencers/Show';
import InfluencersTokens from '../views/InfluencersTokens/index'
import InfluencersTokensInsert from '@/views/InfluencersTokens/Insert';
import InfluencersTokensEdit from '@/views/InfluencersTokens/Edit';
import InfluencersTokensShow from '@/views/InfluencersTokens/Show';
import Figures from '../views/Figures/index'
import FiguresEdit from '@/views/Figures/Edit';
import FiguresShow from '@/views/Figures/Show';
import LogIn from '../views/Auth/LogIn/index'
import LogOut from '../views/Auth/LogOut/index'

import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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
      <PrivateRoute exact path="/app/" component={Dashboard} />
      <PrivateRoute exact path="/app/players" component={Players} />
      <PrivateRoute exact path="/app/players/show/:id" component={PlayersShow} />
      <PrivateRoute exact path="/app/influencers" component={Influencers} />
      <PrivateRoute exact path="/app/influencers/insert" component={InfluencersInsert} />
      <PrivateRoute exact path="/app/influencers/edit/:id" component={InfluencersEdit} />
      <PrivateRoute exact path="/app/influencers/show/:id" component={InfluencersShow} />
      <PrivateRoute exact path="/app/influencers-tokens" component={InfluencersTokens} />
      <PrivateRoute exact path="/app/influencers-tokens/insert" component={InfluencersTokensInsert} />
      <PrivateRoute exact path="/app/influencers-tokens/edit/:id" component={InfluencersTokensEdit} />
      <PrivateRoute exact path="/app/influencers-tokens/show/:id" component={InfluencersTokensShow} />
      <PrivateRoute exact path="/app/figures" component={Figures} />
      <PrivateRoute exact path="/app/figures/edit/:id" component={FiguresEdit} />
      <PrivateRoute exact path="/app/figures/show/:id" component={FiguresShow} />
      <Route exact path="/login" component={LogIn} />
      <PrivateRoute exact path="/app/sair" component={LogOut} />
      <Route path="*" component={() => <Redirect to="/" />} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
