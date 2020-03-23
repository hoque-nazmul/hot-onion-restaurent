import React from 'react';
import "./Shipment.css"

const Shipment = () => {
    return (
        <div className="container">
            <div className="ShipmentSection">
                <div className="row justify-content-around">
                    <div className="col-md-6">
                        <h2>Edit Delivery Details</h2>
                        <form>
                            <input type="text" placeholder="Your Name"/>
                            <input type="email" placeholder="Your Email"/>
                            <input type="text" placeholder="Your Address"/>
                            <input type="text" placeholder="Your City"/>
                            <input type="text" placeholder="Your Country"/>
                            <input type="text" placeholder="Zipcode Number"/>
                            <button>Save & Continue</button>
                        </form>
                    </div>
                    <div className="col-md-4">
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipment;