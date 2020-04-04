import React from 'react';
import './Login.css'
import logo from '../../images/logo.png'
import googleIcon from '../../images/google.png'

const Login = () => {
    return (
        <div className="LoginWrapper">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="LoginContent">
                            <img src={logo} alt=""/>

                            <button className="GoogleSignIn"><img src={googleIcon} alt=""/> Sign In With Google</button>

                            <form action="">
                                <input type="text" placeholder="Name" name="name" id="name" required/>
                                <input type="text" placeholder="Eamil" name="email" id="email" required/>
                                <input type="password" placeholder="Password" name="password" id="password" required/>
                                <input type="password" placeholder="Confirm Password" name="confirmPassword" id="confirmPassword" required/>
                                <input type="submit" value="Sign Up"/>
                            </form>
                            <p className="loginText">Already have an Account</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;