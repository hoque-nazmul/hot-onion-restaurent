import React, { useState, useEffect } from 'react';
import "./Shop.css";
import fakeData from '../../fakeData';
import LunchProducts from '../LunchProducts/LunchProducts';

const Shop = () => {
    
    const data = fakeData;
    const [lunchProduct, setLunchProduct] = useState(data);
    useEffect(() => {
        const lunchProudcts = data.filter(product => product.category === "lunch")
        setLunchProduct(lunchProudcts)
        
    },[])
   

    return (
        <div className="ShopSection">
          <div className="ShopContent">
            <div className="ShopBtnWrapper d-flex justify-content-center">
               <div>
                    <button className="ShopBtn">Breakfast</button>
                    <button className="ShopBtn">Lunch</button>
                    <button className="ShopBtn">Dinner</button>
               </div>
            </div>
            {
                lunchProduct.map(product => <LunchProducts 
                                                key={product.id}
                                                products = {product}>
                                            </LunchProducts>)
            }
          </div>
        </div>
    );
};
export default Shop;