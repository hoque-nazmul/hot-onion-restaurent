import React, { useState } from 'react';
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = (props) => {
    const [paymentError, setPaymentError] = useState(null);

    const stripe = useStripe();
    const elements = useElements();

    if(paymentError) {
        setTimeout( ()  => {
            setPaymentError(null);
        }, 5000)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        console.log(error, paymentMethod);
        if(error) {
            setPaymentError(error);
        }else{
            const payment = {id: paymentMethod.id, brand: paymentMethod.card.brand, last4: paymentMethod.card.last4}
            props.handlePlaceOrder(payment);
            setPaymentError(null);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>

            {
                paymentError && <p style={{ color: 'red', marginTop: '15px' }}>{paymentError}</p>
            }
        </form>
    );
};

export default CheckoutForm;