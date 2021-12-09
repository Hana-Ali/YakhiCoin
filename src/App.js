// importing React
import React from 'react';
// importing CreateWallet page
import CreateWallet from './components/createWallet/CreatePage';
// importing the Home page
import HomePage from './components/homePage/HomePage';
// Importing the YakhiChain page
import YakhiChain from './components/yakhiChain/BlockPage';
// Importing the YakhiMine page
import YakhiMine from './components/yakhiMine/MinePage';
// Importing the User page
import UserPage from './components/userPage/UserPage';
// importing the LayoutRoute
import LayoutRoute from './LayoutRoute';
import LayoutRouteGray from './LayoutRouteGray';
// importing the App css
import './App.css';
// Importing the react-router things needed
import { BrowserRouter as Router, Switch } from 'react-router-dom';



function App() {

  return (
    <Router>
      <Switch>
          <LayoutRoute path="/" exact={true} component={CreateWallet} />
          <LayoutRoute path="/buy-yak" exact={true} component={HomePage} />
          <LayoutRouteGray path="/yak-chain" exact={true} component={YakhiChain} />
          <LayoutRoute path="/mine-yak" exact={true} component={YakhiMine} /> 
          <LayoutRouteGray path="/user" exact={true} component={UserPage} />
      </Switch>
    </Router>
  );
}

export default App;
