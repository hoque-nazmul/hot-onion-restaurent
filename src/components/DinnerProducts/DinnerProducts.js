import React from 'react';

const DinnerProducts = (props) => {
    const {name, price, category} = props.dinnerProducts;
    return (
        <div>
            <h2>{name}</h2><p>{price}</p><p>{category}</p>
        </div>
    );
};

export default DinnerProducts;