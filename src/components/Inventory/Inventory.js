import React from 'react';

const Inventory = () => {

    const addAllFoodItems = () => {
        alert("Foods already added!");
    }
    return (
        <div className="my-5 text-center">
            <h2>This is Inventory page</h2>
            <button onClick={addAllFoodItems} className="btn btn-success">Add All Foods</button>
        </div>
    );
};

export default Inventory;