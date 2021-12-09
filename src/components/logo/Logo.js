// Importing react
import React from 'react';
// Importing styled components
import styled from "styled-components";
// Importing the image
import AliLogo from "../../assets/images/aliStandYAK.png"
// Importing Link
import { Link } from 'react-router-dom';

// Styling the wrapper for the logo
const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    background-color: transparent;
`;

// Styling the actual logo, as well as its container
const LogoImg = styled.div`
    width: 150px;
    height: 60px;
    background-color: transparent;
    margin-top: 3px;

    img {
        background: transparent;
        width: 100%;
        height: 100%;
    }
`;

// Creating logo
function Logo(props) {
    return (
        // First we make the wrapper
        <LogoWrapper>
            {/* Inside the wrapper we'll have the image */}
            <Link to="/">
                <LogoImg><img src={AliLogo} alt="YAKHI logo" /></LogoImg>
            </Link>
        </LogoWrapper>
    );
}

export default Logo;
