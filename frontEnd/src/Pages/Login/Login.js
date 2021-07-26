import React from 'react'
import { Link } from 'react-router-dom'
import "./Login.css"
const Login = () => {
    return (
        <div className="login">
            <section className="signup1">
                <div className="signup-form">
                    <h2 className="form-title">Log In</h2>
                    <hr />
                    <form className="register-form" id="register-form">
                        <div className="form-group">
                            <label htmlFor="email" >
                                <i class="zmdi zmdi-email  material-icons-name"></i>
                            </label>
                            <input type="text" name="email" id="email" autoComplete="off" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" >
                                <i class="zmdi zmdi-lock  material-icons-name"></i>
                            </label>
                            <input type="password" name="password" id="password" autoComplete="off" placeholder="Enter password" />
                        </div>
                        <div className="form-signup-group">
                            <button type="submit" name="signUp-button" id="signUp-button">Log In</button>
                        </div>
                        <Link to = "/" className = "Link">Create Account?</Link>
                    </form>

                </div>
            </section>
        </div>
    )
}

export default Login
