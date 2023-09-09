import React from 'react'

const LoginSignup = () => {
    return(
        <div className='container'>
            <div className='header'>
                <div className="text">Sign</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="text" name="username" id="" />
                </div>
                <div className="input">
                    <input type="text" name="first_name" id="" />
                </div>
            </div>
            <div className="submit-container">
                <div className="submit">Sign Up</div>
                <div className="submit">Login</div>
            </div>
        </div>
    )
}