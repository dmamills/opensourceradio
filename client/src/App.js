import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AdminApp from './admin/App';
import ClientApp from './ClientApp';

const FullApp = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ClientApp />
        </Route>
        <Route path="/admin">
      <AdminApp />
        </Route>
      </Switch>
    </Router>
  );
};

export default FullApp;
