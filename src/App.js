import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import Shop from './components/Shop/Shop';
import SingleProduct from './components/SingleProduct/SingleProduct';
import Shipment from './components/Shipment/Shipment';

function App() {
  return (
    <Router>
       <div className="App">
          <Navbar></Navbar>
          <Switch>
            <Route path="/product/:productKey">
              <SingleProduct></SingleProduct>
            </Route>
            <Route path="/shipment">
                <Shipment></Shipment>
            </Route>
            <Route path="/">
              <Banner></Banner>
              <Shop></Shop>
            </Route>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
