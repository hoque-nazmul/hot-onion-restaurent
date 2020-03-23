import React, { useState, useEffect } from 'react';
import "./Shipment.css"
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import CartProducts from '../CartProducts/CartProducts';

const Shipment = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productkeys = Object.keys(savedCart)
        const cartProduct = productkeys.map(key => {
            const getProduct = fakeData.find(product => product.key === key)
            getProduct.quantity = savedCart[key];
            return getProduct;
        })
        setCart(cartProduct);
    }, [])

    return (
        <div className="container">
            <div className="ShipmentSection">
                <div className="row justify-content-around">
                    <div className="col-md-6">
                        <h2>Edit Delivery Details</h2>
                        <form>
                            <input type="text" placeholder="Your Name"/>
                            <input type="email" placeholder="Your Email"/>
                            <input type="text" placeholder="Your Address"/>
                            <input type="text" placeholder="Your City"/>
                            <input type="text" placeholder="Your Country"/>
                            <input type="text" placeholder="Zipcode Number"/>
                            <button>Save & Continue</button>
                        </form>
                    </div>
                    <div className="col-md-4">
                        <h6>Cart Foods</h6>
                        {
                            cart.map(product => <CartProducts key={product.key} cartProduct={product}></CartProducts>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipment;