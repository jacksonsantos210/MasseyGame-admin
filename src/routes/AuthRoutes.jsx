import React from 'react';
import { BrowserRouter, Route,Redirect } from 'react-router-dom';

import LogIn from '@/views/Auth/LogIn';
import LogOut from '@/views/Auth/LogOut';

const AuthRoutes = () => {
 return (
   <BrowserRouter>
     <Route exact path="/" component={LogIn} />
     <Route exact path="/app/sair" component={LogOut} />
     <Route path="*" component={() => <Redirect to="/" />} />
   </BrowserRouter>
 );
};

export default AuthRoutes;