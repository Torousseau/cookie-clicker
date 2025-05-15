import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";

function Header() {
    const navigate = useNavigate();

    const handleReturnHome = () => {
        navigate('/');
    };

    return (
        <button className="home-button" onClick={handleReturnHome}>
            <FontAwesomeIcon icon={faHome}/>
        </button>
    );
}

export default Header;
