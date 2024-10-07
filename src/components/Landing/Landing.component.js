import React from "react";
import { useEffect } from "react";
import logo from '../../assets/images/logo.png';
import './Landing.scss';

function Landing() {

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            window.location.href = "/aie/home"
        } else {
            window.location.href = "/aie/auth"
        }
    }, []);

    return(
        <img src={logo} alt="aie-logo"/>
    );
}

export default Landing;