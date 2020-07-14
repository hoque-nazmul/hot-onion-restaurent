import React from 'react';
import logo from '../../images/logo.png'
import "./Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart } from '../../utilities/databaseManager';

const Navbar = (props) => {
    let { cartAmount } = props;
    if (cartAmount === 0) {
        const cart = getDatabaseCart();
        cartAmount = Object.keys(cart).length;
    }
    const auth = useAuth();
    const user = auth.user;

    // dynamically handled cart icon
    let cart = '';
    if (cartAmount > 0 && auth.user) {
        cart = <Link to="/shipment"><span className="CartIconActive"><FontAwesomeIcon icon={faShoppingCart} /> (<span className="cartLength">{cartAmount}</span>)</span></Link>
    }
    else if (cartAmount > 0) {
        cart = <Link to="/shipment"><span className="CartIconActive"><FontAwesomeIcon icon={faShoppingCart} /> (<span className="cartLength">{cartAmount}</span>)</span></Link>
    }
    else {
        cart = <span onClick={() => alert("Cart is empty yet. Keep Shopping")}  className="CartIcon"><FontAwesomeIcon icon={faShoppingCart} /> (<span className="cartLength">{cartAmount}</span>)</span>
        
    }
    return (
        <div className="NavbarWrapper">
            <div className="NavbarContent">
                <div className="NavbarLeft">
                    <Link to="/"><img src={logo} alt="" /></Link>
                </div>
                <div className="NavbarRight">
                    {
                        cart
                    }

                    {
                        user && <span style={{ marginRight: '10px', color: '#F91944', fontWeight: 'bold', cursor: 'pointer' }}>{user.name && user.name.split(' ').slice(0, -1).join(' ')}</span>
                    }
                    
                    {
                        user ? <Link to="/login"><button className="BtnSignUp">Sign Out</button></Link> : <Link to="/login"><button className="BtnSignUp">Sign Up</button></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;