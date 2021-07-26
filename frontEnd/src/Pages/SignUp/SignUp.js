import React from 'react'
import { Link } from 'react-router-dom'
import "./SignUp.css"
const SignUp = () => {
    return (
        <div className="signup" >
            <section className="signup1">
                <div className="signup-form">
                    <h2 className="form-title">Sign Up</h2>
                    <hr />
                    <form className="register-form" id="register-form">
                        <div className="form-group">
                            <label htmlFor="name" >
                                <i class="zmdi zmdi-account  material-icons-name"></i>
                            </label>
                            <input type="text" name="name" id="name" autoComplete="off" placeholder="Your Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" >
                                <i class="zmdi zmdi-email  material-icons-name"></i>
                            </label>
                            <input type="text" name="email" id="email" autoComplete="off" placeholder="Your Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" >
                                <i class="zmdi zmdi-lock  material-icons-name"></i>
                            </label>
                            <input type="password" name="password" id="password" autoComplete="off" placeholder="Add password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm-password" >
                                <i class="zmdi zmdi-lock  material-icons-name"></i>
                            </label>
                            <input type="password" name="confirm-password" id="confirm-password" autoComplete="off" placeholder="Confirm password" />
                        </div>
                        <div className="form-signup-group">
                            <button type="submit" name="signUp-button" id="signUp-button">Sign Up</button>
                        </div>
                        <Link to = "/Login" className = "Link">Already have an account? Login</Link>
                    </form>

                </div>
            </section>
        </div>
    )
}

export default SignUp
