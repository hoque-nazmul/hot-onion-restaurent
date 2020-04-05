import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {

    const addAllFoodItems = () => {
        const fakedata = fakeData;
        fetch('http://localhost:4000/addAllFoods', {
            method: 'POST',
            body: JSON.stringify(fakedata),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(response => response.json())
          .then(json => console.log(json))
    }
    return (
        <div className="my-5 text-center">
            <h2>This is Inventory page</h2>
            <button onClick={addAllFoodItems} className="btn btn-success">Add All Foods</button>
        </div>
    );
};

export default Inventory;