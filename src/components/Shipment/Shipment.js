import React, { useState, useEffect } from 'react';
import "./Shipment.css"
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import CartProducts from '../CartProducts/CartProducts';
import { useForm } from 'react-hook-form'
import { useAuth } from '../Login/useAuth';
import deliveryImg from '../../images/Group 1151.png'
import symbolicImg from '../../images/Group 1152.png'
import map from '../../images/map.png'
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom';

const Shipment = () => {
    const [cart, setCart] = useState([]);
    const [orderBtn, setOrderBtn] = useState(null);
    const [erorOrderBtn, setErrorOrderBtn] = useState(null);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [showPayment, setShowPayment] = useState(null);
    const stripePromise = loadStripe('pk_test_51H4psTCHY76gUC694bjWT15XdnyMbADLaqHyEKZuCmcIq3F1tQporpqjMZOroNlrmHDLIMU4h1jvq24a5K8c4ZXC00OzdtWPa9');
    const auth = useAuth();
    const user = auth.user;

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productkeys = Object.keys(savedCart)

        fetch('https://fathomless-ridge-69474.herokuapp.com/foodsByKeys', {
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
        setShippingInfo(data);
        setOrderBtn(true);
    }

    // For sending all order info to database
    const handlePlaceOrder = (paymentInfo) => {
        const email = user.email;
        const shippingData = shippingInfo;
        const cart = getDatabaseCart();
        const payment = paymentInfo;
        const orderDetails = { email, shippingData, cart, payment }

        fetch('https://fathomless-ridge-69474.herokuapp.com/placeOrder', {
            method: 'POST',
            body: JSON.stringify(orderDetails),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(data => {
                setOrderId(data._id);
                processOrder();
            })
    }

    // Handle Active Button
    const handleActiveOrder = () => {
        setShowPayment(true);
    }

    //  Handle Inactive Button
    const handleInactiveOrder = () => {
        setErrorOrderBtn("You have to fill up delivery details to place order");
        setTimeout(() => {
            setErrorOrderBtn(null);
        }, 3000);
    }

    if(orderId) {
        setTimeout(() => {
            window.location.pathname = '/';
        }, 5000)
    }

    // Today function
    function getTomorrow() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); // even 32 is acceptable
        return `${tomorrow.getFullYear()}/${tomorrow.getMonth() + 1}/${tomorrow.getDate()}`;
    }

    return (
        <div className="container">
            <div className="ShipmentSection">
                {
                    <div style={{ display: showPayment && 'none' }} className="row justify-content-around">
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
                                orderBtn ? <button onClick={handleActiveOrder} className="ActiveOrder">Place Order</button> : <button onClick={handleInactiveOrder} className="InactiveOrder">Place Order</button>
                            }
                            {
                                erorOrderBtn && <p style={{ color: 'red', fontWeight: 'bold', fontSize: '15px' }}>{erorOrderBtn}</p>
                            }
                        </div>
                    </div>
                }

                {
                    <div style={{ display: showPayment ? 'block' : 'none' }} >
                    <div className="row my-5 justify-content-between">
                        <div className="col-md-3">
                            <div className="CheckOutLeft">
                                <img src={deliveryImg} alt="" />
                                <div className="CheckoutAddress">
                                    <div className="UserAddress">
                                        <h4>Your Location</h4>
                                        <p>{shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}`}</p>
                                    </div>
                                    <div className="ShopAddress">
                                        <h4>Shop Address</h4>
                                        <p>Agrabad, Chittagong</p>
                                    </div>
                                </div>
                                <div className="DeliveryTime my-4 mx-3">
                                    <h2>{getTomorrow()} <span>5:00pm</span></h2>
                                    <p>Approximate Delivery Time</p>
                                </div>
                                <div className="UserName d-flex align-items-center justify-content-start">
                                    <img src={symbolicImg} alt="" className="img-fluid" />
                                    <div className="mt-3">
                                        <h4>{ shippingInfo ? shippingInfo.name : "Nazmul Hoque" }</h4>
                                        <p>Your render</p>
                                    </div>
                                </div>
                                <button className="mt-3">Contact</button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            {
                                orderId ? <div className="successOrderMsg">
                                    <h2>Thanks for shopping with us.</h2>
                                    <p>Your Order ID: {orderId}</p>
                                    <Link to="/"><button>Go Home</button></Link>
                                </div>
                                    :
                                    <div className="CheckOutForm">
                                        <h2>Payment Information</h2>
                                        <Elements stripe={stripePromise}>
                                            <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
                                        </Elements>
                                    </div>
                            }

                        </div>
                        <div className="col-md-3">
                            <div className="CheckOutRight">
                                <img src={map} alt="" className="img-fluid ml-auto" />
                            </div>
                        </div>
                    </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Shipment;