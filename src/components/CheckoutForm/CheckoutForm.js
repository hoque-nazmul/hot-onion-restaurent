import React, { useState } from 'react';
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const [paymentError, setPaymentError] = useState(null);
    const [paymentData, setPaymentData] = useState(null);

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
            setPaymentData(null);
        }else{
            setPaymentData(paymentMethod);
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
            {
                paymentData && <p style={{ color: 'green', marginTop: '15px' }}>Payment Successfull</p>
            }
        </form>
    );
};

export default CheckoutForm;