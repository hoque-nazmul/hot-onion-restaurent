import React from 'react';
import './Login.css'
import logo from '../../images/logo.png'
import googleIcon from '../../images/google.png'
import signOut from '../../images/signout.png'
import { useState } from 'react';
import Auth from './useAuth';
import { useForm } from 'react-hook-form';

const Login = () => {
    const [returningUser, setReturningUser] = useState(false);
    const [signInData, setSignInData] = useState({ email: "", password: "" });

    const auth = Auth();

    const handleSignIn = () => {
        auth.signInWithGoogle()
    }
    const handleSignOut = () => {
        auth.signOut()
            .then(res => {
                window.location.pathname = '/';
            })
    }

    // Temporary Submit Handler
    // TODO: filter the input & Develop it by firebase authentication system.

    // Demo Sign up & Sign in Form Handler 
    const { register, handleSubmit, errors, watch } = useForm()
    const onSubmit = data => {
        if (data.name && data.email && data.password && data.confirmPassword) {
            auth.signUp(data.email, data.confirmPassword, data.name)
        }
    }

    // sign in
    const handleBlur = (e) => {
        const newUser = {
            ...signInData
        }
        let inputName = e.target.name;
        let inputValue = e.target.value;

        newUser[inputName] = inputValue;
        setSignInData(newUser)
    }

    const singInHandler = (event) => {
        event.preventDefault();

        if (signInData.email && signInData.password) {
            auth.signIn(signInData.email, signInData.password)
        }
        event.target.reset();

        setSignInData({ email: "", password: "" })
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
                            {
                                returningUser ?
                                    <div>
                                        {
                                            auth.user != null && <p className="text-danger">* {auth.user.error}</p>
                                        }
                                        <form onSubmit={singInHandler}>
                                            <input type="email" name="email" onBlur={handleBlur} placeholder="Email" />
                                            <input type="password" name="password" onBlur={handleBlur} placeholder="Password" />

                                            <input type="submit" value="Sign In" />
                                        </form>
                                        <p onClick={() => setReturningUser(false)} className="loginText">Create a new Account</p>
                                    </div>
                                    :
                                    <div>
                                        {
                                            auth.user != null && <p className="text-danger">* {auth.user.error}</p>
                                        }
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <input name="name" ref={register({ required: true })} placeholder="Name" />
                                            {errors.name && <span className="inputError">Name is required</span>}

                                            <input name="email" ref={register({
                                                required: true,
                                                validate: () => /^.+@.+\..+$/.test(watch('email'))
                                            })} placeholder="Email" />
                                            {errors.email && <span className="inputError">Please, Provide a valid Email</span>}

                                            <input type="password" name="password" ref={register({ required: true, minLength: 6 })} placeholder="Password" />
                                            {errors.password && <span className="inputError">Password must be six or greater than six character</span>}

                                            <input type="password" name="confirmPassword" ref={register({ validate: (value) => value === watch('password') })} placeholder="Confirm Password" />
                                            {errors.confirmPassword && <span className="inputError">Password Doesn't match</span>}

                                            <input type="submit" value="Sign up" />
                                        </form>
                                        <p onClick={() => setReturningUser(true)} className="loginText">Already have an Account</p>
                                    </div>

                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;