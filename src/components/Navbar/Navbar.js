import React from 'react';
import logo from '../../images/logo.png'
import "./Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="NavbarWrapper">
            <div className="NavbarContent">
                <div className="NavbarLeft">
                    <Link to="/"><img src={logo} alt=""/></Link>
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