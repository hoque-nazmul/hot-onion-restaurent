import React from 'react';

const LunchProducts = (props) => {
    const {name, price} = props.products; 
    return (
        <div>
            <h2>{name}</h2>
            <p>{price}</p>
        </div>
    );
};

export default LunchProducts;