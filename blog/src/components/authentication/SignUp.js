import React, { useState } from 'react';
import '../../static/authentication/signup.css'
import axios from 'axios';
import bcrypt from 'bcryptjs'
import { useNavigate } from "react-router-dom";

function SignUp(props) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const clickHandler = () => {
        setLoading(true);
        axios.post('/users/signup', {
            name : name,
            username: username,
            password: hashIt(password)
        })
        .then((res) => {
            setLoading(false);
            alert(res.data.message)
            navigate('/signin')
        })
        .catch((err) => {
            setLoading(false);
            setError(err.response.data.message);
        })
    }

    const hashIt = (password) => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password,salt)
    }

    const handleSignup = () => {
        navigate('/signin')
    }
    return(
        <div id="signup" className="d-flex flex-column justify-content-center align-items-center">
            <div className="signupcontainer">
                <div className="signinbody d-flex flex-column align-items-center p-5">
                    <div className="heading mt-4">
                        <h1>SIGN UP</h1>
                    </div>
                    <div className="d-flex flex-column mt-5">
                        <form className="">
                            <input className="input w-100" type="text" name="name" placeholder="Enter Your full name" onChange={(e) => setName(e.target.value)} required />
                            <br />
                            <input className="w-100 mt-5" type="text" name="username" placeholder="Enter a unique username" onChange={(e) => setUsername(e.target.value)} required />
                            <br />
                            <input className="w-100 mt-5" type="password" name="password" placeholder="Enter a password" onChange={(e) => setPassword(e.target.value)} required />
                            <input className="w-100 mt-5 btn_cred" type="button" name="submit" value={loading ? 'Loading...' : 'SIGN UP'} onClick={clickHandler} disabled={loading} />
                            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                            <small><span id="or"></span> OR</small><br />
                            <small><span id="acc" >Have an account? </span></small>
                            <br />
                            <input className="w-100 mt-2 mb-5 btn_cred" type="button" value={loading ? 'Loading...' : 'SIGN IN'} onClick={handleSignup} disabled={loading} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
