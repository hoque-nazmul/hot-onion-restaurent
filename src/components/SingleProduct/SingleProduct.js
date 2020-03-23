import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './SingleProduct.css'

const SingleProduct = () => {
    const { productKey } = useParams();
    const product = fakeData.find(pd => pd.key === productKey)

    const [quantity, setQuantity] = useState(1);
    // const [price, setPrice] = useState(product.price);

   

    const handlePlusIcon = () => {
        const ProductQuantity = quantity + 1;
        // const ProductPrice = ProductQuantity * price;
        setQuantity(ProductQuantity);
        // setPrice(ProductPrice);
    }
    const handleMinusIcon = () => {
        if(quantity >= 2) {
            const ProductQuantity = quantity - 1;
            // const ProductPrice = ProductQuantity * price;
            setQuantity(ProductQuantity);
            // setPrice(ProductPrice);
        }
    }

    return (
        <div className="container">
            <div className="ProductSection">
                <div className="ProductContents d-flex justify-content-between align-items-center">
                    <div className="ProductTexts">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <div className="ProductPrice d-flex align-items-center">
                            <h4>&#36; <span id="price">{quantity > 0 ? product.price * quantity : product.price}</span></h4>
                            <div className="ProductQuantity d-flex">
                                <button onClick={handleMinusIcon}>-</button>
                                <span id="quantity">{ quantity }</span>
                                <button onClick={handlePlusIcon}>+</button>
                            </div>
                        </div>
                        <button className="CartBtn"><FontAwesomeIcon icon={faShoppingCart} /><span>Add</span></button>
                    </div>
                    <div className="ProductImage">
                        <img src={product.img} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;