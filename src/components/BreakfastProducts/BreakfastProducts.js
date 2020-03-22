import React from 'react';

const BreakfastProducts = (props) => {
    const {name, price, category} = props.breakfastProducts;
    return (
        <div style={{ borderTop: '1px solid #000' }}>
            <h2>{name}</h2>
            <p>{price}</p>
    <p>{category}</p>
        </div>
    );
};

export default BreakfastProducts;