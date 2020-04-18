import React from 'react';
import logo from '../../images/logo.png'
import "./Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart } from '../../utilities/databaseManager';

const Navbar = (props) => {
    let {cartAmount} = props;
    if(cartAmount === 0) {
        const cart = getDatabaseCart();
        cartAmount = Object.keys(cart).length;
    }
    const auth = useAuth();
    const user = auth.user;
    return (
        <div className="NavbarWrapper">
            <div className="NavbarContent">
                <div className="NavbarLeft">
                    <Link to="/"><img src={logo} alt=""/></Link>
                </div>
                <div className="NavbarRight">
                    <span className="CartIcon"><FontAwesomeIcon icon={faShoppingCart} /> (<span style={{ color: '#F91944', fontWeight: 'bold', padding: '2px' }}>{cartAmount}</span>)</span>
                    {  
                        user && <span style={{ marginRight: '10px', color: '#F91944', fontWeight:'bold', cursor: 'pointer' }}>{user.name.split(' ').slice(0, -1).join(' ')}</span> 
                    }
                    {
                        user ? <Link to="/login"><button className="BtnSignUp">Sign Out</button></Link> : <Link to="/login"><button className="BtnSignUp">Login</button></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;