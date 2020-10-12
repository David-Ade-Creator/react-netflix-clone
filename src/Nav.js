import React, { useEffect, useState } from 'react';
import './Nav.css'

function Nav() {
    const [show,handleShow] = useState(false);

    useEffect(()=>{
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.addEventListener("scroll");
        };
    },[])



    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img 
            className="nav_logo"
            src="https://assets.brand.microsites.netflix.io/assets/493f5bba-81a4-11e9-bf79-066b49664af6_cm_1440w.png?v=41"
             alt="Netflix logo"/>

             <img 
             className="nav_avatar"
             src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="Netflix logo"/>
        </div>
    )
}

export default Nav
