import React, { useState, useEffect } from 'react';
import "./Shop.css";
import LunchProducts from '../LunchProducts/LunchProducts';
import BreakfastProducts from '../BreakfastProducts/BreakfastProducts';
import DinnerProducts from '../DinnerProducts/DinnerProducts';
import { getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Shop = () => {
  const [foods, setFoods] = useState([]);

  const [lunchProduct, setLunchProduct] = useState([]);
  const [breakfastProduct, setbreakfastProduct] = useState([]);
  const [dinnerProduct, setDinnerProduct] = useState([]);



  const [showBreakfast, setShowBreakfast] = useState(false);
  const [showLunch, setShowLunch] = useState(true);
  const [showDinner, setShowDinner] = useState(false);
  useEffect(() => {
    // Get All Foods & Lunch Foods for HomePage
    fetch('http://localhost:4000/foods')
      .then(res => res.json())
      .then(data => {
        const lunchFoods = data.filter(food => food.category === 'lunch');
        setLunchProduct(lunchFoods)
        setFoods(data)
      })
      .catch(err => console.log(err))

  }, [])
  const handleBreakfastProduct = () => {
    const breakfastFoods = foods.filter(food => food.category === 'breakfast');
    setbreakfastProduct(breakfastFoods)

    setShowBreakfast(true);
    setShowLunch(false);
    setShowDinner(false);
  }
  const handleLunchProduct = () => {
    const lanchFoods = foods.filter(food => food.category === 'lunch');
    setLunchProduct(lanchFoods)

    setShowLunch(true);
    setShowBreakfast(false);
    setShowDinner(false);
  }
  const handleDinnerProduct = () => {
    const dinnerFoods = foods.filter(food => food.category === 'dinner');
    setDinnerProduct(dinnerFoods)

    setShowDinner(true);
    setShowLunch(false);
    setShowBreakfast(false);
  }

  // Cart Amount
  const cartInfo = getDatabaseCart();
  const cartProductKeys = Object.keys(cartInfo);
  const productKeysCount = cartProductKeys.length;

  // button
  const auth = useAuth();
  let checkOutBtn = '';
  if (productKeysCount > 0 && auth.user) {
    checkOutBtn = <Link to="/shipment"><button className="checkoutBtnActivate">Checkout Your Foods</button></Link>
  }
  else if (productKeysCount > 0) {
    checkOutBtn = <Link to="/shipment"><button className="checkoutBtnActivate">Login to Checkout</button></Link>
  }
  else {
    checkOutBtn = <button onClick={() => alert("Cart is empty yet. Keep Shopping")} className="checkoutBtn">Checkout Your Foods</button>
  }



  return (
    <div className="ShopSection">
      <div className="ShopContent">
        <div className="ShopBtnWrapper d-flex justify-content-center">
          <div className="pb-2">
            <button onClick={handleBreakfastProduct} className={showBreakfast ? 'ShopBtnActive' : 'ShopBtnInactive'}>Breakfast</button>
            <button onClick={handleLunchProduct} className={showLunch ? 'ShopBtnActive' : 'ShopBtnInactive'}>Lunch</button>
            <button onClick={handleDinnerProduct} className={showDinner ? 'ShopBtnActive' : 'ShopBtnInactive'}>Dinner</button>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {
              showLunch && 
              lunchProduct.map(product => <LunchProducts
                key={product.key}
                lunchProducts={product}>
              </LunchProducts>)
            }
          </div>
          <div className="row">
            {
              showBreakfast &&
              breakfastProduct.map(product => <BreakfastProducts
                key={product.key}
                breakfastProducts={product}>
              </BreakfastProducts>)
            }
          </div>
          <div className="row">
            {
              showDinner &&
              dinnerProduct.map(product => <DinnerProducts
                key={product.key}
                dinnerProducts={product}>
              </DinnerProducts>)
            }
          </div>
        </div>
      </div>
      {
        checkOutBtn
      }

    </div>
  );
};
export default Shop;