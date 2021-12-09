// Importing react
import React from 'react';
// Importing styled-components
import styled from 'styled-components';
// Importing Block
import Block from './Block';

const Wrapper = styled.div`
    text-align: center;
    background-color: #F9F9FB;
    min-height: 100vh;
`

function BlockPage(props) {

    return(
        <Wrapper>
            <Block />
        </Wrapper>

    );
}

export default BlockPage;