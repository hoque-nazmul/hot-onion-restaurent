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

    const total = cart.reduce((total, product) => total + product.price * product.quantity, 0)
    const tax = total/10;

    // const processOrders = (cart) => {
    //     const cartProcessor = processOrder(cart);
    //     setCart(cartProcessor);
    // }

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
                        <h6 style={{ fontSize: '18px', borderBottom: '1px solid #D2D2D2', paddingBottom: '10px', marginBottom: '20px' }}>Cart Foods</h6>
                        {
                            cart.length > 0 ? cart.map(product => <CartProducts key={product.key} cartProduct={product}></CartProducts>) : <h2>Cart is Empty</h2>
                            
                        }
                        <div className="CartSummary d-flex justify-content-between">
                            <div className="CartSummaryText">
                                <p>Subtotal</p>
                                <p>Tax</p>
                                <p>Total</p>
                            </div>
                            <div className="CartSummaryNumber">
                                <p>&#36; {total.toFixed(2)}</p>
                                <p>&#36; {tax.toFixed(2)}</p>
                                <p>&#36; {(total + tax).toFixed(2)}</p>
                            </div>
                        </div>
                        <button>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipment;