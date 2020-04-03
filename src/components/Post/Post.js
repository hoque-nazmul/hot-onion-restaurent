import React from 'react';
import './Post.css';
import homeDeliveryImg from '../../images/architecture-building-city-2047397.png'
import fastDeliveryImg from '../../images/adult-blur-blurred-background-687824.png'
import autoResponderImg from '../../images/chef-cook-food-33614.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faBell, faLuggageCart, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

const Post = () => {
    const [moreText, setMoreText] = useState(null);

    const handleSeeMore = () => {
        setMoreText(" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque sunm ipsum dolor sit amet");
    }
    return (
        <div className="container whyChooseUs mb-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="ContentTop">
                        <h2>Why Choose Us</h2>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis laboriosam repellat perferendis corrupti numquam neque, vitae nemo.</p>
                    </div>
                    <div className="col-md-6"></div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="PostContent">
                        <img src={fastDeliveryImg} alt="" className="img-fluid" />
                        <div className="row mt-4">
                            <div className="col-md-2 mt-3">
                                <span className="HeaderIcon"><FontAwesomeIcon icon={faTruck} /></span>
                            </div>
                            <div className="col-md-10">
                                <h2>Fast Delivery</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat suscipit beatae quam et inventore eum{
                                        moreText && moreText
                                    }</p>
                                <button onClick={handleSeeMore}>See more <span className="btnIcon"><FontAwesomeIcon icon={faArrowRight} /></span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="PostContent">
                        <img src={autoResponderImg} alt="" className="img-fluid" />
                        <div className="row mt-4">
                            <div className="col-md-2 mt-3">
                                <span className="HeaderIcon"><FontAwesomeIcon icon={faBell} /></span>
                            </div>
                            <div className="col-md-10">
                                <h2>A Good Auto Responder</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat suscipit beatae quam et inventore eum{ moreText && moreText }</p>
                                <button onClick={handleSeeMore}>See more <span className="btnIcon"><FontAwesomeIcon icon={faArrowRight} /></span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="PostContent">
                        <img src={homeDeliveryImg} alt="" width='300px' className="img-fluid" />
                        <div className="row mt-4">
                            <div className="col-md-2 mt-3">
                                <span className="HeaderIcon"><FontAwesomeIcon icon={faLuggageCart} /></span>
                            </div>
                            <div className="col-md-10">
                                <h2>Home Delivery</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat suscipit beatae quam et inventore eum{
                                        moreText && moreText
                                    }</p>
                                <button onClick={handleSeeMore}>See more <span className="btnIcon"><FontAwesomeIcon icon={faArrowRight} /></span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;