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


function App() {
  return (
    <Router>
       <div className="App">
         <AuthContextProvider>
            <Navbar></Navbar>
            <Switch>
              <Route path="/product/:productKey">
                <SingleProduct></SingleProduct>
              </Route>
              <PrivateRoute path="/shipment">
                  <Shipment></Shipment>
              </PrivateRoute>
              <Route exact path="/">
                <Banner></Banner>
                <Shop></Shop>
                <Post></Post>
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
