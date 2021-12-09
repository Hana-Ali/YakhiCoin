// Import react
import React from 'react';
// Import the styling
import styled from 'styled-components';
// importing the account icon
import { UserAccount } from '@styled-icons/boxicons-solid/UserAccount';
// importing link from router-dom
import { Link } from 'react-router-dom';

// Styling the entire account container
const AccountBarContainer = styled.div`
    display: flex;
    position: relative;
    background-color: transparent;
    left: -50px;
`;

// Styling the container for the account icon
const AccountIconContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0px;
    width: 35px;
    height: 100%;
    background: black;
    border-radius: 3px;
    color: black;
`;

const AccountIcon = styled(UserAccount)`
    position: absolute;
    width: 35px;
    height: 35px;
    top: 50%;
    left: 50%;
    color: #6A1C2B;
    transform: translate(110%, -50%);
    cursor: pointer;
`;

function RightSideNavbar(props) {

    return(
        <AccountBarContainer>
            <AccountIconContainer>
                <span><Link to='/user'><AccountIcon /></Link></span>
            </AccountIconContainer>
        </AccountBarContainer>
    );
}

export default RightSideNavbar;