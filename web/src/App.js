import React from 'react';
import './App.scss';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '@/views/Home';
import Room from '@/views/Room';
import My from '@/views/My';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/room/:roomId/:uid">
            <Room />
          </Route>
          <Route path="/my">
            <My />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
