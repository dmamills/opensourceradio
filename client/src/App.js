import React from 'react';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import AdminApp from './admin/App';
import ClientApp from './ClientApp';

const App = () => {
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

export default App;
