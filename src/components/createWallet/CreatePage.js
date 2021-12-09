// import React
import React, { useState, useEffect, useContext } from 'react';
// import styled
import styled from 'styled-components';
// import motion
import { motion } from 'framer-motion';
// import css
import './CreatePage.css';
// importing some necessary functions
import { toPem, toPemP } from './CreatePageFunctions';
// Importing UserContext
import { UserContext } from '../../UserContext';
// Importing Link
import { Link } from 'react-router-dom';

// Submit button style
const SubmitButton = styled.button`
    justify-content: center;
    text-align: center;
    margin: 0 auto;
    background-color: #6A1C2B;
    border: none;
    width: 100px;
    height: 35px;
    border-radius: 4px;
    color: white;
    text-transform: uppercase;
    font-family: 'Poppins', sans-serif;
    transition: 0.25s;
    margin-bottom: 30px;

    &:hover {
        cursor: pointer;
        background-color: #A42C43;
    }

`;

// Container for the box
const FullContainer = styled(motion.div)`
    width: 100%;
    height: 100%;
    min-height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

// Making the box style
const BoxContainer = styled.div`
    width: 650px;
    min-height: 450px;
    display: flex;
    flex-direction: column;
    border-radius: 19px;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
    position: relative;
    overflow: hidden;
    margin-bottom: 50px;
`;

// container with backdrop and the content
const TopContainer = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 1.8em;
    padding-bottom: 5em;
`;

// Making the backdrop
const BackDrop = styled(motion.div)`
    width: 160%;
    height: 550px;
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 50%;
    transform: rotate(0deg);
    top: -325px;
    left: -500px;
    background: #6A1C2B;
`;

const BackDrop2 = styled(motion.div)`
    width: 160%;
    height: 550px;
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 50%;
    transform: rotate(0deg);
    top: -325px;
    left: -300px;
    background: #6A1C2B;
`;

// Making the header container
const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

// Styles for the header
const HeaderText = styled.h2`
    font-size: 30px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    line-height: 1.24;
    color: #fff;
    z-index: 10;
    margin: 0;
`;

// Styles for the smaller text
const SmallText = styled.h5`
    color: #fff;
    font-weight: 500;
    font-size: 11px;
    z-index: 10;
    margin: 0;
    margin-top: 7px;
`;

// For what would be inside as forms and so
const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1.8rem;
`;

// Just for the initial
const initialContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
};

// Generate the key pair first
var userPrivateKey, userPublicKey;
// Function for key generation, takes the state dispatch function to update states
function generation(dispatch) {
    // Generate the key, defining properties
    window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048, // can be 1024, 2048 or 4096
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: { name: "SHA-256" } // or SHA-512
        },
        true,
        ["encrypt", "decrypt"]
        // Getting the keyPair
    ).then(function (keyPair) {
        // Exporting the private key to plaintext. Private Key is in pkcs8 format
        window.crypto.subtle.exportKey(
            "pkcs8",
            keyPair.privateKey
        ).then(function (exportedPrivateKey) {
            // converting exported private key to PEM format
            userPrivateKey = toPem(exportedPrivateKey)
            // Storing private key in user local storage
            localStorage.setItem('privateKey', userPrivateKey)
            // Setting private key state
            dispatch({ priv: userPrivateKey })
            // Console logging
            console.log('Priv: ', userPrivateKey);
            // Catching error
        }).catch(function (err) {
            console.log(err);
        });

        // Exporting the public key to plaintext. Public Key is in spki format
        window.crypto.subtle.exportKey(
            "spki",
            keyPair.publicKey
        ).then(function (exportedPublicKey) {
            // converting exported public key to PEM format
            userPublicKey = toPemP(exportedPublicKey);
            // Storing public key in user local storage
            localStorage.setItem('publicKey', userPublicKey);
            // Setting public key state
            dispatch({ pub: userPublicKey })
            // Console logging
            console.log('Pub: ', userPublicKey);
            // Catching error
        }).catch(function (err) {
            console.log(err);
        });
    });
}

function CreatePage(props) {
    // Getting shared context function
    const { dispatch } = useContext(UserContext);
    // To change the SET button
    const [inputtedKeys, setInputtedKeys] = useState(false);

    // Generation will only work every time user refreshes
    useEffect(() => {
        generation(dispatch);
    }, [])

    // Variables for the public and private keys
    let publicField, privateField;
    // Create object with public/private for user input
    const keyPairObject = { "public": "", "private": "" }
    // Function to set user address if inputted
    function setAddresses() {
        // Getting public and private key values from input bar
        keyPairObject.public = publicField.value;
        keyPairObject.private = privateField.value;

        // Remove all spaces in between - when user copies, it copies with spaces. We need to remove
        // to do proper set up of keys
        keyPairObject.public = keyPairObject.public.replace(/\s/g, '');
        keyPairObject.private = keyPairObject.private.replace(/\s/g, '');

        // Set public and private keys to these values
        dispatch({ pub: keyPairObject.public });
        dispatch({ priv: keyPairObject.private });
        // Set the keys in application local storage
        localStorage.setItem('privateKey', keyPairObject.private)
        localStorage.setItem('publicKey', keyPairObject.public)

        // To change the button shape
        setInputtedKeys(true);
    }

    // Making actual page
    return (
        <FullContainer
            variants={initialContainer}
            initial="hidden"
            animate="show"
        >
            <BoxContainer>
                <TopContainer>
                    <BackDrop />
                    <HeaderContainer>
                        <HeaderText>Come Here</HeaderText>
                        <HeaderText>Often?</HeaderText>
                        <SmallText>Please grab your public & private keys to continue!</SmallText>
                    </HeaderContainer>
                </TopContainer>

                <InnerContainer className="innerContainer">
                    <p className="innerTitle">Public Key:</p>
                    <p className="keysText"> {userPublicKey} </p>
                    <p className="innerTitle">Private Key:</p>
                    <p className="keysText"> {userPrivateKey}</p>
                    <p></p>
                    <Link className="submitLink" to='/buy-yak'><SubmitButton>Let's Go!</SubmitButton></Link>
                </InnerContainer>
            </BoxContainer>

            <BoxContainer>
                <TopContainer>
                    <BackDrop2 />
                    <HeaderContainer>
                        <HeaderText>Already Got An</HeaderText>
                        <HeaderText>Account?</HeaderText>
                        <SmallText>Hand over your keys</SmallText>
                    </HeaderContainer>
                </TopContainer>

                <InnerContainer className="innerContainer">
                    <input ref={(elem) => publicField = elem} type="text" className="tokenNumber" placeholder="Public address" />
                    <input ref={(elem) => privateField = elem} type="text" className="tokenNumber" placeholder="Private address" />

                    {
                        inputtedKeys !== true &&
                        <SubmitButton style={{ "marginTop": "30px" }} onClick={setAddresses}>SET KEYS</SubmitButton>
                    }

                    {
                        inputtedKeys === true &&
                        <Link className="submitLink" to="/buy-yak"><SubmitButton>LET'S GO</SubmitButton></Link>
                    }

                </InnerContainer>
            </BoxContainer>

        </FullContainer>
    );
}

export default CreatePage;