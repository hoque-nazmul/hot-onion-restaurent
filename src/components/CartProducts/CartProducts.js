import React, { useState } from 'react';
import './CartProducts.css'

const CartProducts = (props) => {
    const {name, quantity, img, price} = props.cartProduct;

    const [qty, setQty] = useState(quantity);

    const handlePlusIcon = () => {
        const ProductQuantity = qty + 1;
        setQty(ProductQuantity);
    }
    const handleMinusIcon = () => {
        if(qty >= 2) {
            const ProductQuantity = qty - 1;
            setQty(ProductQuantity);
        }
    }
    return (
        <div className="CartSection">
            <div className="CartFoods d-flex justify-content-between align-items-center">
                <div className="CartContent d-flex justify-content-start">
                    <div className="CartImg">
                        <img src={img} alt=""/>
                    </div>
                    <div className="CartText">
                        <h4>{name}</h4>
                        <h6>&#36; {price}</h6>
                        <p>Delivery Free</p>
                    </div>
                </div>
                <div className="ProductQuantity d-flex align-items-center">
                    <button onClick={handleMinusIcon}>-</button>
                    <span id="quantity">{ qty }</span>
                    <button onClick={handlePlusIcon}>+</button>
                </div>
            </div>
        </div>
    );
};

export default CartProducts;