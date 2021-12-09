// Importing react
import React, { useState, useContext } from 'react';
// Importing styled-components
import styled from 'styled-components';
// Import Individual Image
import IndividualImage from './IndividualImage';
// Import css 
import './LandingPage.css';
// importing all images
import Lady from '../../assets/images/LandingPlane-Resized/Lady.png';
import Headset from '../../assets/images/LandingPlane-Resized/Headset.png';
import Green from '../../assets/images/LandingPlane-Resized/Green.png';
import Bulb from '../../assets/images/LandingPlane-Resized/Bulb.png';
import Book from '../../assets/images/LandingPlane-Resized/Book.png';
import BCRight from '../../assets/images/LandingPlane-Resized/BCRight.png';
import BCLeft from '../../assets/images/LandingPlane-Resized/BCLeft.png';
import BCBubble from '../../assets/images/LandingPlane-Resized/BCBubble.png';
import BCBottom from '../../assets/images/LandingPlane-Resized/BCBottom.png';
import Bag from '../../assets/images/LandingPlane-Resized/Bag.png';
// Importing framer-motion
import { motion } from 'framer-motion';
// Importing UserContext
import { UserContext } from '../../UserContext';
// Importing RSA functions
import { encryptMessage } from './RSAFunctions';
// Importing Link
import { Link } from 'react-router-dom';

// Main container style
const MainContainer = styled(motion.div)`
    width: 100vw;
    height: 88vh;
    min-width: 1000px;
    min-height: 600px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    overflow: hidden;
`;

// Left content style
const ContentLeft = styled.div`
    position: relative;
    margin: auto;
`;

// Left header text style
const LeftHeaderText = styled.h2`
    font-size: 7vw;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    padding-left: 10px;
    color: #6A1C2B;
    z-index: 10;
    padding: 0 10px;
    margin: 0;
`;

// Small left header text style
const LeftSmallText = styled.h5`
    color: #6A1C2B;
    -webkit-text-stroke: 1px rgba(15, 15, 15, 0.2);
    font-weight: 500;
    font-size: 1.5vh;
    z-index: 10;
    margin: 0;
    padding: 0 10px;
    margin-top: 7px;
`;

// Header container style
const HeaderContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: left;
`;

// Animation variant for images
const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

// Submit button style
const SubmitButton = styled.button`
    justify-content: center;
    text-align: center;
    margin: 0 auto;
    margin-top: 30px;
    background-color: #6A1C2B;
    border: none;
    width: 100px;
    height: 35px;
    border-radius: 4px;
    color: white;
    text-transform: uppercase;
    font-family: 'Poppins', sans-serif;
    transition: 0.25s;

    &:hover {
        cursor: pointer;
        background-color: #A42C43;
    }

`;

// Creating the actual landing page
function LandingPage(props) {

    // Getting user context values
    const { state: { pub, priv }, dispatch } = useContext(UserContext);

    // This will define the backend error state
    const [backendError, setBackendError] = useState("initial");

    // State variables for the key checking
    const [incorrectKeyType, setIncorrectKeyType] = useState(false);
    const [invalidKey, setInvalidKey] = useState(false);
    const [success, setSuccess] = useState(false);
    // Console logging states
    console.log('Pub: ', pub);
    console.log('Priv: ', priv)

    // Variables for the fields
    let fromField, toField, amountField, feeField;

    // Object to input (WILL BE WHAT WE ENCRYPT)
    const inputObject = { "amount": "", "fee": "" };
    // Object to send to backend
    const formInfo = { "from": "", "to": "", "amount": "", "fee": "" };

    // Function to check whether or not user is verified
    async function checking() {
        // Getting values from input bar
        // Remove all spaces in between - when user copies, it copies with spaces. We need to remove
        // to do proper validity check
        let fromAddress = fromField.value.replace(/\s/g, '');
        inputObject.amount = amountField.value;
        inputObject.fee = feeField.value;

        formInfo.from = fromField.value.replace(/\s/g, '');
        formInfo.to = toField.value.replace(/\s/g, '');
        formInfo.amount = amountField.value.replace(/\s/g, '');
        formInfo.fee = feeField.value.replace(/\s/g, '');

        // ENCRYPTING USING PUBLIC KEY OF USER (STATE), DECRYPT USING PRIVATE KEY, DATA IS AMOUNT AND FEE
        let output = await encryptMessage(inputObject, fromAddress, priv, dispatch)
        console.log('incorrectKeyType is ', output[0])
        console.log('invalidKey is ', output[1])
        console.log('output is', output)
        // Setting the states based on output from encryption
        setIncorrectKeyType(output[0]);
        setInvalidKey(output[1]);
        setSuccess(output[2]);

        // If verification went fine - incorrectKeyType is false
        if (!output[0]) {
            console.log("Verification worked fine")
            appending();
        }
    }

    // Appending function is used to send the transaction to the backend
    function appending() {
        // Console logging
        console.log('in Appending');
        console.log('formInfo', formInfo);
        console.log('formInfofrom', formInfo.from)

        // Adding transaction - endpoint is in .env file (SENT OBJECT MUST BE STRING)
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/add-transaction`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(formInfo)
        // Capturing backend response and making sure it's OK
        }).then((backendResponse) => {
            if (backendResponse.ok)
                return backendResponse.json();
        // Capturing the backend response as JSON
        }).then((theJSON) => {
            // ERROR: 1 - not enough funds
            // ERROR: 0 - no errors
            console.log('theJSON: ', theJSON);
            console.log('Error is: ', theJSON.error);

            if (theJSON.error === 1) {
                console.log('Insufficient')
                setBackendError("insufficient");
            }
            else if (theJSON.error === 0) {
                console.log("Sufficient funds")
                setBackendError("sufficient")
            }
            else {
                console.log("Mongo error")
                setBackendError("mongo");
            }
        // Capturing any errors from fetch process
        }).catch((error) => {
            console.log('error is', error);
        })
        console.log('exited appending')
    }

    return (
        <MainContainer>

                <ContentLeft>
                    <HeaderContainer id="content">
                        <LeftHeaderText>Join us</LeftHeaderText>
                        <LeftHeaderText>Today</LeftHeaderText>
                        <LeftSmallText>High profits and fresh memes. What else?</LeftSmallText>
                        <input ref={(elem) => fromField = elem} type="text" className="tokenNumber" placeholder="From address" />
                        <input ref={(elem) => toField = elem} type="text" className="tokenNumber" placeholder="To address" />
                        <input ref={(elem) => amountField = elem} type="number" className="tokenNumber" placeholder="How many Yakhis?" min="1" pattern="[0-9]" name="number" id="numberOfToken" />
                        <input ref={(elem) => feeField = elem} type="number" className="tokenNumber" placeholder="Fees" min="1" pattern="[0-9]" name="number" id="fees" />

                        {/* This will define whether we show the Submit button (initial State), Success banner (encryption/decryption fine),
                            unsuccessful banner (encryption/decryption not fine) */}
                        {
                            incorrectKeyType === false && invalidKey === false && success === false &&
                            <SubmitButton onClick={checking}>Submit</SubmitButton>
                        }
                        {
                            incorrectKeyType === true && invalidKey === false && success === false &&
                            <div>
                                <div className="alert alert-danger" role="alert" style={{ "marginTop": "50px" }}>
                                    Incorrect key format. Are you sure this is your public key?
                                </div>
                                <SubmitButton onClick={checking}>Submit</SubmitButton>
                            </div>
                        }
                        {
                            incorrectKeyType === true && invalidKey === true && success === false &&
                            <div className="alert alert-danger" role="alert" style={{ "marginTop": "50px" }}>
                                You think I don't know a liar when I see one?
                            </div>
                        }
                        {/* Verification, but insufficient */}
                        {
                            success === true && backendError === "insufficient" &&
                            <div>
                                <div className="alert alert-danger" role="alert" style={{ "marginTop": "50px" }}>
                                    lol stop being poor bro we both know u can't afford that
                                </div>
                                <SubmitButton onClick={checking}>Retry</SubmitButton>
                            </div>
                        }
                        {/* Verification, but mongo error */}
                        {
                            success === true && backendError === "mongo" &&
                            <div>
                                <div className="alert alert-danger" role="alert" style={{ "marginTop": "50px" }}>
                                    Servers suck rn sorry bro
                                </div>
                                <SubmitButton onClick={checking}>Retry</SubmitButton>
                            </div>
                        }
                        {/* Verification AND sufficient */}
                        {
                            success === true && backendError === "sufficient" &&
                            <div>
                                <div className="alert alert-success" role="alert" style={{ "marginTop": "25px" }}>
                                    Success!
                                </div>
                                <Link to='mine-yak' className="nextButton">
                                    <SubmitButton style={{ "margin": "0 auto" }}>NEXT</SubmitButton>
                                </Link>
                            </div>
                        }

                    </HeaderContainer>
                </ContentLeft>

            <div className="parentOfAll">
                <div className="allGroups">
                    <IndividualImage className="Lady" imageVariant={item} imageSource={Lady} style={{ "zIndex": "0" }} />
                    <IndividualImage className="Headset" imageVariant={item} imageSource={Headset} style={{ "zIndex": "1" }} />
                    <IndividualImage className="Green" imageVariant={item} imageSource={Green} style={{ "zIndex": "2" }} />
                    <IndividualImage className="Bulb" imageVariant={item} imageSource={Bulb} style={{ "zIndex": "3" }} />
                    <IndividualImage className="Book" imageVariant={item} imageSource={Book} style={{ "zIndex": "4" }} />
                    <IndividualImage className="BCRight" imageVariant={item} imageSource={BCRight} style={{ "zIndex": "5" }} />
                    <IndividualImage className="BCLeft" imageVariant={item} imageSource={BCLeft} style={{ "zIndex": "6" }} />
                    <IndividualImage className="BCBubble" imageVariant={item} imageSource={BCBubble} style={{ "zIndex": "7" }} />
                    <IndividualImage className="BCBottom" imageVariant={item} imageSource={BCBottom} style={{ "zIndex": "8" }} />
                    <IndividualImage className="Bag" imageVariant={item} imageSource={Bag} style={{ "zIndex": "9" }} />
                </div>
            </div>
        </MainContainer>
    );
}

export default LandingPage;