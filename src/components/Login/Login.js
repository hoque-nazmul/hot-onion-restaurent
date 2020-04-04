import React from 'react';
import './Login.css'
import logo from '../../images/logo.png'
import googleIcon from '../../images/google.png'
import { useState } from 'react';

const Login = () => {

    // Handle Switch Form
    const [switchForm, setSwitchForm] = useState(false);
    const handleSwitchForm = () => {
        setSwitchForm(true);
    }
    const handleNewForm = () => {
        setSwitchForm(false);
    }
    // Temporary Submit Handler
    // TODO: filter the input & Develop it by firebase authentication system.
    const DemoSubmit = (event) => {
        alert("This Action hasn't Developed yet. plz, Sign in with Google");

        event.preventDefault();
        event.target.reset();
    }
    return (
        <div className="LoginWrapper">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="LoginContent">
                            <img src={logo} alt=""/>

                            <button className="GoogleSignIn"><img src={googleIcon} alt=""/> Sign In With Google</button>

                            <form style={{ display: switchForm===false ? 'block' : 'none' }} onSubmit={ DemoSubmit }>
                                <input type="text" placeholder="Name" name="name" id="name" required/>
                                <input type="text" placeholder="Eamil" name="email" id="email" required/>
                                <input type="password" placeholder="Password" name="password" id="password" required/>
                                <input type="password" placeholder="Confirm Password" name="confirmPassword" id="confirmPassword" required/>
                                <input type="submit" value="Sign Up"/>
                            </form>
                            <form style={{ display: switchForm ? 'block' : 'none' }} onSubmit={ DemoSubmit }>
                                <input type="text" placeholder="Eamil" name="signInEmail" id="signInEmail" required/>
                                <input type="password" placeholder="Password" name="signInPass" id="signInPass" required/>
                                <input type="submit" value="Sign in"/>
                            </form>
                            {
                                switchForm ? <p onClick={ handleNewForm } className="loginText">Create a new Account</p> : <p onClick={ handleSwitchForm } className="loginText">Already have an Account</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;