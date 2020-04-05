import React, { useState, useEffect } from 'react';
import "./Shipment.css"
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import CartProducts from '../CartProducts/CartProducts';
import { useForm } from 'react-hook-form'
import { useAuth } from '../Login/useAuth';

const Shipment = () => {
    const [cart, setCart] = useState([]);
    const [orderBtn, setOrderBtn] = useState(null);
    const [erorOrderBtn, setErrorOrderBtn] = useState(null);
    const auth = useAuth();
    const user = auth.user;

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productkeys = Object.keys(savedCart)

        fetch('http://localhost:4000/foodsByKeys', {
            method: 'POST',
            body: JSON.stringify(productkeys),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(product => {
                const cartProduct = productkeys.map(key => {
                    const getProduct = product.find(product => product.key === key)
                    getProduct.quantity = savedCart[key];
                    return getProduct;
                })
                setCart(cartProduct);
            })
    }, [])

    const total = cart.reduce((total, product) => total + product.price * product.quantity, 0)
    const tax = total / 10;

    // handle Remove Cart
    const handleRemoveCart = (productKey) => {
        const confirmRemove = window.confirm('Are You Sure!');
        if (confirmRemove) {
            const newCart = cart.filter(product => product.key !== productKey);
            setCart(newCart);
            removeFromDatabaseCart(productKey);
        }
    }

    // Shipment Form 
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = data => {
        console.log(data)
        setOrderBtn(true);
    }

    //  Handle Inactive Button
    const handleInactiveOrder = () => {
        setErrorOrderBtn("You have to fill up delivery details to place order");
        setTimeout(() => {
            setErrorOrderBtn(null);
        }, 3000);
    }

    return (
        <div className="container">
            <div className="ShipmentSection">
                <div className="row justify-content-around">
                    <div className="col-md-6">
                        <h2>Edit Delivery Details</h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input name="name" defaultValue={user.name} ref={register({ required: true })} placeholder="Your Name" />
                            {errors.name && <span className="inputError">Name is required</span>}
                            <input name="email" defaultValue={user.email} ref={register({ required: true })} placeholder="Your Email" />
                            {errors.email && <span className="inputError">Eamil is required</span>}
                            <input name="address" ref={register({ required: true })} placeholder="Your Address" />
                            {errors.address && <span className="inputError">Address is required</span>}
                            <input name="city" ref={register({ required: true })} placeholder="Your City" />
                            {errors.city && <span className="inputError">City is required</span>}
                            <input name="country" ref={register({ required: true })} placeholder="Your Country" />
                            {errors.country && <span className="inputError">Country is required</span>}
                            <input name="zipcode" ref={register({ required: true })} placeholder="Zipcode Number" />
                            {errors.zipcode && <span className="inputError">Zipcode is required</span>}

                            <input type="submit" value="Save & Continue" />
                        </form>
                    </div>
                    <div className="col-md-4">
                        <h6 style={{ fontSize: '18px', borderBottom: '1px solid #D2D2D2', paddingBottom: '10px', marginBottom: '20px' }}>Cart Food Items: {cart.length}</h6>
                        {
                            cart.length > 0 ? cart.map(product => <CartProducts key={product.key} handleRemoveCart={handleRemoveCart} cartProduct={product}></CartProducts>) : 
                            <div id="preloder">
                                <div className="loader"></div>
                            </div>
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
                        {
                            orderBtn ? <button className="ActiveOrder">Place Order</button> : <button onClick={handleInactiveOrder} className="InactiveOrder">Place Order</button>
                        }
                        {
                            erorOrderBtn && <p style={{ color: 'red', fontWeight: 'bold', fontSize: '15px' }}>{erorOrderBtn}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipment;