import React from "react";
import { useEffect } from "react";
import logo from '../../assets/images/logo.png';
import './Landing.scss';

function Landing() {

    useEffect(() => {
        setTimeout(() => {
            window.location.href = "/aie/auth"
        }, 1000);
    }, []);

    return(
        <img src={logo} alt="aie-logo"/>
    );
}

export default Landing;