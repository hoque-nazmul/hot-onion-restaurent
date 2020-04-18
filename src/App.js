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
import { AuthContextProvider, PrivateRoute } from './components/Login/useAuth';
import Inventory from './components/Inventory/Inventory';
import { useState } from 'react';


function App() {
  const [cartAmount, setCartAmount] = useState(0);
  return (
    <Router>
       <div className="App">
         <AuthContextProvider>
            <Navbar cartAmount={cartAmount}></Navbar>
            <Switch>
              <Route path="/product/:productKey">
                <SingleProduct setCartAmount= {setCartAmount}></SingleProduct>
              </Route>
              <PrivateRoute path="/shipment">
                  <Shipment></Shipment>
              </PrivateRoute>
              <Route exact path="/">
                <Banner></Banner>
                <Shop></Shop>
                <Post></Post>
              </Route>
              <Route path="/inventory">
                <Inventory></Inventory>
              </Route>
              <Route path="/login">
                <Login></Login>
              </Route>
              <Route path="*">
                <NotFound></NotFound>
              </Route>
            </Switch>
            <Footer></Footer>
          </AuthContextProvider>
        </div>
    </Router>
  );
}

export default App;
