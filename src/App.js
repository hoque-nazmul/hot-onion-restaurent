import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import Shop from './components/Shop/Shop';
import SingleProduct from './components/SingleProduct/SingleProduct';
import Shipment from './components/Shipment/Shipment';
import Post from './components/Post/Post';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';


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
            <Route exact path="/">
              <Banner></Banner>
              <Shop></Shop>
              <Post></Post>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="">
              <NotFound></NotFound>
            </Route>
          </Switch>
          <Footer></Footer>
        </div>
    </Router>
  );
}

export default App;
