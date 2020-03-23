import React from 'react';
import '../LunchProducts/LunchProducts.css'
import { Link } from 'react-router-dom';

const BreakfastProducts = (props) => {
    const {key, name, price, img, short_dsc, category} = props.breakfastProducts;
    return (
        <div className="container">
            <div className="row ProductWrapper">
                <div className="col-md-8 offset-md-2 ProductContent align-items-center d-flex  justify-content-around">
                    <div className="ProductImg">
                        <Link to={"/product/"+key}>
                            <img src={img} alt=""/>
                        </Link>
                    </div>
                    <div className="ProductText">
                        <Link to={"/product/"+key}>
                            <h4 className="title">{name}</h4>
                            <p style={{ marginBottom: '5px' }}>{short_dsc}</p>
                            <p style={{ textTransform: 'capitalize' }}>Category: {category}</p>
                            <h6>&#36; {price}</h6>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreakfastProducts;