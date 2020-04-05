import React, { useState, useEffect } from 'react';
import "./Shipment.css"
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import CartProducts from '../CartProducts/CartProducts';
import { useForm } from 'react-hook-form'

const Shipment = () => {
    const [cart, setCart] = useState([]);
    const [orderBtn, setOrderBtn] = useState(null);
    const [erorOrderBtn, setErrorOrderBtn] = useState(null);

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
    const tax = total / 10;

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

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input name="name" ref={register({ required: true })} placeholder="Your Name"/>
                            {errors.name && <span className="inputError">Name is required</span>}
                            <input name="email" ref={register({ required: true })} placeholder="Your Email"/>
                            {errors.email && <span className="inputError">Eamil is required</span>}
                            <input name="address" ref={register({ required: true })} placeholder="Your Address"/>
                            {errors.address && <span className="inputError">Address is required</span>}
                            <input name="city" ref={register({ required: true })} placeholder="Your City"/>
                            {errors.city && <span className="inputError">City is required</span>}
                            <input name="country" ref={register({ required: true })} placeholder="Your Country"/>
                            {errors.country && <span className="inputError">Country is required</span>}
                            <input name="zipcode" ref={register({ required: true })} placeholder="Zipcode Number"/>
                            {errors.zipcode && <span className="inputError">Zipcode is required</span>}

                            <input type="submit" />
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
                        {
                            orderBtn ?  <button className="ActiveOrder">Place Order</button> : <button onClick={handleInactiveOrder} className="InactiveOrder">Place Order</button>
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