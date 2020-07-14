import React from 'react';
import './Login.css'
import logo from '../../images/logo.png'
import googleIcon from '../../images/google.png'
import signOut from '../../images/signout.png'
import { useState } from 'react';
import Auth from './useAuth';
import { useForm } from 'react-hook-form';

const Login = () => {
    const auth = Auth();

    const handleSignIn = () => {
        auth.signInWithGoogle()
            .then(res => {
                window.location.pathname = '/';
            })
    }
    const handleSignOut = () => {
        auth.signOut()
            .then(res => {
                window.location.pathname = '/';
            })
    }

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

    // Demo Sign up & Sign in Form Handler 
    const { register, handleSubmit, errors } = useForm()
    const onSignUpWithEamil = data => { 
        console.log(data.password)
        alert("Sorry, It hasn't Developed yet. Please, Sign in with Google");
     }
     const onSignInWithEamil = datas => { 
        console.log(datas)
        alert("Sorry, It hasn't Developed yet. Please, Sign in with Google");
     }

    return (
        <div className="LoginWrapper">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="LoginContent">
                            <img src={logo} alt="" />

                            {
                                auth.user ? <button onClick={handleSignOut} className="GoogleSignIn"><img src={signOut} alt="" /> Sign Out</button> : <button onClick={handleSignIn} className="GoogleSignIn"><img src={googleIcon} alt="" /> Sign In With Google</button>
                            }

                            {/* Using React Hook Form */}
                            <form style={{ display: switchForm === false ? 'none' : 'block' }} onSubmit={handleSubmit(onSignUpWithEamil)}>
                                <input name="name" ref={register({ required: true })} placeholder="Name" />
                                {errors.name && <span className="inputError">Name is required</span>}

                                <input name="email" ref={register({ required: true })} placeholder="Email" />
                                {errors.email && <span className="inputError">Eamil is required</span>}

                                <input type="password" name="password" ref={register({ required: true })} placeholder="Password" />
                                {errors.password && <span className="inputError">Password is required</span>}

                                <input type="password" name="confirmPassword" ref={register({ required: true })} placeholder="Confirm Password" />
                                {errors.confirmPassword && <span className="inputError">Confirm Password is required</span>}
                                
                                <input type="submit" value="Sign up" />
                            </form>
                            
                            {/* Without Using React Hook Form */}
                            <form style={{ display: switchForm ? 'none' : 'block' }} onSubmit={onSignInWithEamil}>
                                <input name="loginEmail" placeholder="Email" />
                                {errors.loginEmail && <span className="inputError">Eamil is required</span>}

                                <input type="password" name="loginPassword" placeholder="Password" />
                                {errors.loginPassword && <span className="inputError">Password is required</span>}
                                
                                <input type="submit" value="Sign in"/>
                            </form>

                            {
                                switchForm ? <p onClick={handleNewForm} className="loginText">Already have an Account</p> : <p onClick={handleSwitchForm} className="loginText">Create a new Account</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;