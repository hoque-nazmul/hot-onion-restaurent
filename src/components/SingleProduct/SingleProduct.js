import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import './SingleProduct.css'
import { addToDatabaseCart } from '../../utilities/databaseManager';

const SingleProduct = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/food/' + productKey)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
    }, [productKey]);

    const [quantity, setQuantity] = useState(1);
    const [btn, setBtn] = useState(true);
    const [successMsg, setSuceessMsg] = useState(null);

    const hanldeCart = (cartProduct) => {
        addToDatabaseCart(cartProduct.key, quantity);
        setBtn(false)
        setSuceessMsg("Product Successfully added to Your Cart");
        setTimeout(() => {
            setSuceessMsg(null);
        }, 2000)
    }

    const handlePlusIcon = () => {
        const ProductQuantity = quantity + 1;
        setQuantity(ProductQuantity);
    }
    const handleMinusIcon = () => {
        if (quantity >= 2) {
            const ProductQuantity = quantity - 1;
            setQuantity(ProductQuantity);
        }
    }
    return (
        <div className="container">
            <div className="ProductSection">
                <div className="ProductContents d-flex justify-content-between align-items-center">
                    <div className="ProductTexts">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        {
                            product.quantity ?
                                <div>
                                    <div className="ProductPrice d-flex align-items-center mt-3">
                                        <h4>&#36; <span id="price">{quantity > 0 ? (product.price * quantity).toFixed(2) : product.price}</span></h4>
                                        <div className="ProductQuantity d-flex">
                                            <button onClick={handleMinusIcon}>-</button>
                                            <span id="quantity">{quantity}</span>
                                            <button onClick={handlePlusIcon}>+</button>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center">
                                        <div className="BottomLeft">
                                            {
                                                btn ? <button onClick={() => hanldeCart(product)} className="CartBtn"><FontAwesomeIcon icon={faShoppingCart} /><span>Add</span></button> : <Link to="/"><button className="CartBtn"><span>Shop More</span><FontAwesomeIcon icon={faAngleDoubleRight} /></button></Link>
                                            }
                                        </div>
                                        <div className="BottomRight pt-4 ml-4">
                                            {
                                                successMsg && <p style={{ color: 'green', fontWeight: 'bold', marginTop: '10px' }}>{successMsg}</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                                : <div id="preloder">
                                    <div className="loader"></div>
                                </div>
                        }
                    </div>
                    <div className="ProductImage">
                        <img src={product.img} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;