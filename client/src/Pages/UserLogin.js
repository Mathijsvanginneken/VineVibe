import React from 'react';
import axios from "axios";
import {useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { motion } from "framer-motion"
import wine from "../Images/aesop-wines-12MlCD5KlYw-unsplash.jpg"
const API_URL = "http://localhost:3000";

export default function UserLogin(props) {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [errorMessage, setErrorMessage] = useState(undefined);
        const { logInUser } = useContext(AuthContext);
        const handleEmail = (e) => setEmail(e.target.value);
        const handlePassword = (e) => setPassword(e.target.value);
        const handleLoginSubmit = (e) => { e.preventDefault();
        const requestBody = { email, password };
        const storedToken = localStorage.getItem('authToken');
            axios.post(`${API_URL}/users/login`, requestBody,
            { headers: { Authorization: `Bearer ${storedToken}`}})
            .then((response) => {
                const token = response.data.authToken;
                logInUser(token);
                props.history.push("/");
              })
              .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
              });
          };
          
    return (
        <section className="hero has-background-white-ter is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="colum is-half">
                            <img src={wine} alt="wine"></img>
                        </div>
                        <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                            <form
                            action='/users/login'
                            method="POST"
                            className="box"
                            onSubmit={handleLoginSubmit}>
                                <h3 className="is-3">Login</h3>
                                <div className="field">
                                </div>
                                <div className="field">
                                    <label
                                    for="email"
                                    className="label">Email</label>
                                    <div className="control has-icons-left">
                                    <input
                                    type="email"
                                    name="email"
                                    placeholder="e.g. your_email@Vinevibe.com"
                                    className="input"
                                    value={email}
                                    onChange={handleEmail}
                                    required></input>
                                    </div>
                                </div>
                                <div className="field">
                                    <label
                                    for="password"
                                    type="password"
                                    className="label">Password</label>
                                    <div className="control has-icons-left">
                                        <input
                                        type="password"
                                        name="password"
                                        placeholder="********"
                                        className="input"
                                        value={password}
                                        onChange={handlePassword}
                                        required></input>
                                    </div>
                                    <div className='field'>
                                        {/* <a href="/TODO">Forgot Password</a> */}
                                    </div>
                                    <div className="field">
                                        <motion.button
                                        whileHover = {{ scale: 1.1}}
                                        whileTap = {{ scale: 0.9}}
                                        className="button is-warning is-rounded" type="submit">Login</motion.button>
                                    </div>
                                </div>
                            </form>
                            { errorMessage && <p className="error-message">{errorMessage}</p> }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
