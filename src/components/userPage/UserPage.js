// Importing react
import React from 'react';
// Importing styled-components
import styled from 'styled-components';
// Importing Block
import UserWallet from './UserWallet';

const Wrapper = styled.div`
    background-color: #F9F9FB;
`
// Making the user page
function UserPage(props) {

    return(
        <Wrapper>
            <UserWallet />
        </Wrapper>

    );
}

export default UserPage;