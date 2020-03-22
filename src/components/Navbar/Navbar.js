import React from 'react';
import logo from '../../images/logo.png'
import "./Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    return (
        <div className="NavbarWrapper">
            <div className="NavbarContent">
                <div className="NavbarLeft">
                    <img src={logo} alt=""/>
                </div>
                <div className="NavbarRight">
                    <span className="CartIcon"><FontAwesomeIcon icon={faShoppingCart} /></span>
                    <button className="BtnLogin">Login</button>
                    <button className="BtnSignUp">Sign up</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;