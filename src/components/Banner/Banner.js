import React from 'react';
import './Banner.css'

const Banner = () => {
    return (
        <div className="GrandBanner">
            <div className="BannerSection d-flex align-items-center justify-content-center">
                <div className="BannerContent">
                    <h2>Best Food Waiting for Your Belley.</h2>
                    <div className="d-flex justify-content-center">
                    <input type="text" className="SearchInput"/>
                    <button className="SearchBtn">Serch</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;