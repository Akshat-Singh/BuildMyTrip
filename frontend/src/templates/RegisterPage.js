import React, { Component, useState } from 'react';
import Axios from 'axios';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import emailjs from "emailjs-com";
import {Modal} from 'react-bootstrap';

function RegisterPage() {

    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmPassword, setregisterConfirmPassword] = useState("");
    const [modalState, setmodalState] = useState(false);
    const [OTP_input, checkOTP] = useState("");
    const [generatedOTP, setgeneratedOTP] = useState("");

    let history = useHistory();

    const onRegisterUsername = (e) => {

        setRegisterUsername(e.target.value);
    }

    const checkingOTP = (e) => {
        checkOTP(e.target.value);
    }

    const onRegisterPassword = (e) => {
        setRegisterPassword (e.target.value);
        
        if ((e.target.value).length === 0)
            document.getElementById('password-status').innerText="Your password must contain at least 6 alphanumeric characters";
        else if ((e.target.value).length <= 6)
            document.getElementById('password-status').innerHTML="<b>Strength<b>: <span style='color: red'>Very Weak</span> - Not enough characters";
        else if ((/\d/.test(e.target.value)) === false)
            document.getElementById('password-status').innerHTML="<b>Strength<b>: <span style='color: orange'>Weak</span> - Not numeric characters";
        else
            document.getElementById('password-status').innerHTML="<b>Strength<b>: <span style='color: yellow'>Strong</span> - That seems good enough";
    }

    const onRegisterConfirmPassword = (e) => {
        setregisterConfirmPassword (e.target.value);

        if (e.target.value !== registerPassword) 
            document.getElementById('password-status').innerHTML="<span style='color: red'>Passwords Do Not Match!</span>";
        else
            document.getElementById('password-status').innerHTML="<span style='color: yellow'>Passwords Match :) </span>";
    }

    const register = () => {

        if (registerPassword !== registerConfirmPassword){
            alert("Passwords do not match!");
            return;
        }

        if (registerPassword.length <= 6) {
            alert("Your Password length is too short"); 
            return; 
        }

        if (!/\d/.test(registerPassword)) {
            alert("Your password has no numeric characters!"); 
            return; 
        }

        // generates a four digit number
        var OTP = Math.floor(1000 + Math.random() * 9000);

        setgeneratedOTP(OTP);

        var templateParams = {

            email: registerUsername,
            OTP: OTP
        
        };

        emailjs.send('BuildMyTrip', 'template_8wafihk', templateParams, 'user_OXQPAUgJAaocvkKl7iVMf')
        .then(function(response) {
           alert("The OTP has been sent to [" + registerUsername + "]");
        }, function(error) {
           alert('Ran into an error: ', error);
        });

        setmodalState(true);
        
    };

    const verifyOTP = () => {

        if (OTP_input == generatedOTP){

            Axios({
                method: "POST",
                data: {
                    username: registerUsername,
                    password: registerPassword,
                },
                withCredentials: false,
                url: "http://localhost:5000/users/register",
    
            }).then((res) => console.log(res));
    
            history.push("/");

        }
        else {
            alert("You have entered the wrong OTP");
        }

    }

    const closeModal = () => {
        setmodalState(false);
    }

    return (
        

        <div className="register">
            {/* Logo */}
            <img
                style={{
                    position: "absolute",
                    width: "100%",
                    left: "50%",
                    top: "50%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "translate(-50%, -50%)",
                    zIndex: "-1",
                }}
                src='https://res.cloudinary.com/duzmuxrsw/image/upload/v1605703897/register-moonlight_zlmkbm.gif'
                alt='register-bg'
            />
            <div className="register__container" style={{ textAlign: 'center' }}>
                <h1 style={{ fontFamily: "Satisfy", marginTop: "2.5%", fontSize: "40px", color: '#f0f0f0' }}>
                    Register
                </h1>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
                </style>

                <FormControl
                    style={{
                        fontFamily: 'Lato', 
                        backgroundColor: 'rgba(50, 50, 100, 0.5)', 
                        width: '30%', 
                        height: '530px', 
                        alignItems: 'center',
                        color: '#f0f0f0'
                    }}>
                    <h2>
                        Email
                    </h2>
                    <TextField
                        required
                        id="outlined-required"
                        label="Username: Required"
                        variant="outlined"
                        onChange = {onRegisterUsername}
                    />
                    <h2>
                        Password
                    </h2>
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        onChange = {onRegisterPassword}
                    />
                    <h2>
                            Confirm Password
                    </h2>
                    <TextField
                        id="outlined-password-input"
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        onChange = {onRegisterConfirmPassword}
                    />
                    <h4 id="password-status">
                        Your password must contain at least 6 alphanumeric characters
                    </h4>
                    
                    <Button onClick = {register} size="large" id="submit" type="submit" style={{ marginTop: "2%", color: 'white', background: "linear-gradient(45deg, #3734eb 30%, #eb34b1 90%)" }}>
                        Register
                    </Button>

                    <Modal show = {modalState} onHide = {closeModal}>
                        <Modal.Header closeButton> Enter your OTP </Modal.Header> 
                        <Modal.Body> <TextField
                        required
                        id="outlined-required"
                        label="OTP"
                        variant="outlined"
                        onChange = {checkingOTP}
                    /> </Modal.Body>
                        <Modal.Footer> <Button onClick = {verifyOTP} size="large" id="submit" type="submit" style={{ marginTop: "2%", color: 'white', background: "linear-gradient(45deg, #3734eb 30%, #eb34b1 90%)" }}>
                        Enter OTP
                    </Button> </Modal.Footer>
                    </Modal>
                </FormControl>
            </div>
        </div >

    )
}


export default RegisterPage;