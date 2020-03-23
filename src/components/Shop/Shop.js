import React, { useState, useEffect } from 'react';
import "./Shop.css";
import fakeData from '../../fakeData';
import LunchProducts from '../LunchProducts/LunchProducts';
import BreakfastProducts from '../BreakfastProducts/BreakfastProducts';
import DinnerProducts from '../DinnerProducts/DinnerProducts';

const Shop = () => {
    const [lunchProduct, setLunchProduct] = useState(fakeData);
    const [breakfastProduct, setbreakfastProduct] = useState(fakeData);
    const [dinnerProduct, setDinnerProduct] = useState(fakeData);

    const [showBreakfast, setShowBreakfast] = useState(false);
    const [showLunch, setShowLunch] = useState(true);
    const [showDinner, setShowDinner] = useState(false);
    useEffect(() => {
        const lunchProudcts = fakeData.filter(product => product.category === "lunch")
        setLunchProduct(lunchProudcts)
        const breakfastProudcts = fakeData.filter(product => product.category === "breakfast")
        setbreakfastProduct(breakfastProudcts)
        const dinnerProudcts = fakeData.filter(product => product.category === "dinner")
        setDinnerProduct(dinnerProudcts)
        
    },[])
    const handleBreakfastProduct = () => {
      setShowBreakfast(true);
      setShowLunch(false);
      setShowDinner(false);
    }
    const handleLunchProduct = () => {
      setShowLunch(true);
      setShowBreakfast(false);
      setShowDinner(false);
    }
    const handleDinnerProduct = () => {
      setShowDinner(true);
      setShowLunch(false);
      setShowBreakfast(false);
    }
   

    return (
        <div className="ShopSection">
          <div className="ShopContent">
            <div className="ShopBtnWrapper d-flex justify-content-center">
               <div className="pb-2">
                    <button onClick={handleBreakfastProduct} className={ showBreakfast ? 'ShopBtnActive' : 'ShopBtnInactive'}>Breakfast</button>
                    <button onClick={handleLunchProduct} className={ showLunch ? 'ShopBtnActive' : 'ShopBtnInactive'}>Lunch</button>
                    <button onClick={handleDinnerProduct} className={ showDinner ? 'ShopBtnActive' : 'ShopBtnInactive'}>Dinner</button>
               </div>
            </div>
           
            {   
              showLunch &&
                lunchProduct.map(product => <LunchProducts 
                                                key={product.key}
                                                lunchProducts = {product}>
                                            </LunchProducts>)
            }
            {
              showBreakfast &&
                breakfastProduct.map(product => <BreakfastProducts 
                                                  key={product.key}
                                                  breakfastProducts = {product}>
                                              </BreakfastProducts>)
            }
            {
              showDinner &&
                dinnerProduct.map(product => <DinnerProducts
                                                  key={product.key}
                                                  dinnerProducts = {product}>
                                              </DinnerProducts>)
            }
          </div>
        </div>
    );
};
export default Shop;