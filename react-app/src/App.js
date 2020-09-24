import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  CampervanList,
  CampervanDetails
} from './components/Campervan/index'
import Layout from './components/Layout';

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact>
              <CampervanList/>
            </Route>
            <Route path="/details/:id" exac>
              <CampervanDetails/>
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
