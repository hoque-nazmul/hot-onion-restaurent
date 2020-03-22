import React from 'react';

const LunchProducts = (props) => {
    const {name, price, category} = props.lunchProducts; 
    return (
        <div>
            <h2>{name}</h2>
            <p>{price}</p>
    <p>{category}</p>
        </div>
    );
};

export default LunchProducts;