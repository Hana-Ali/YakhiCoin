// Importing react
import React, { useState } from 'react';
// Importing styled-components
import styled from 'styled-components';
// Import Individual Image
import IndividualImage from './IndividualImage';
// Importing icon
import { ArrowRightSquareFill } from '@styled-icons/bootstrap/ArrowRightSquareFill';
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
// ethers library for interacting with the Ethereum Blockchain
// Some people use web3 to interact with the Blockchain, but it's a bit outdated
import { ethers } from "ethers";
// Importing framer-motion
import { motion } from 'framer-motion';

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

const ContentLeft = styled.div`
    position: relative;
    margin: auto;
`;

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

const LeftHeaderTextSmaller = styled.h2`
    font-size: 5vw;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    padding-left: 10px;
    color: #6A1C2B;
    z-index: 10;
    padding: 0 10px;
    margin: 0;
`;

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

const LeftSmallTextYellow = styled.h5`
    color: #E2BD78;
    -webkit-text-stroke: 1px rgba(15, 15, 15, 0.2);
    font-weight: 500;
    font-size: 1.5vh;
    z-index: 10;
    margin: 0;
    padding: 0 10px;
    margin-top: 7px;
`;


const HeaderContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: left;
`;

// Animation variant for non-hoverable objects
const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const SubmitButton = styled(ArrowRightSquareFill)`
    border: none;
    width: 100px;
    height: 35px;
    border-radius: 4px;
    color: #6A1C2B;
    text-transform: uppercase;
    font-family: 'Poppins', sans-serif;
    &:hover {
        cursor: pointer;
        color: #6A1C2B;
    }
`;


const startPayment = async ({ setError, setTxs, setTransaction, ether, addr }) => {
    try {
        // Make sure the person has the Metamask extension for this to work
        if (!window.ethereum)
            throw new Error("No crypto walley found. Please install one");
        else
            console.log("Wallet Detected");
        // Calling this triggers MetaMask extension - asking for permissions
        await window.ethereum.send("eth_requestAccounts");
        // Call the Web3Provider, and provide as parameter the object that Metamask has
        // in the browser
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // We get the signer, given by MetaMask. MM provides no private information
        const signer = provider.getSigner();
        ethers.utils.getAddress(addr);
        // Create transaction
        const tx = await signer.sendTransaction({
            to: addr,
            value: ethers.utils.parseEther(ether)
        });
        console.log("tx", tx);
        setTxs([tx]);
        setTransaction(true);
        // To send transactions, we need a provider (access to the Ethereum network)
        console.log({ ether, addr });
    } catch (err) {
        setError(err.message);
    }
};

function LandingPage(props) {
    // States for the error and the TX
    const [error, setError] = useState();
    const [txs, setTxs] = useState([]);
    const [transaction, setTransaction] = useState(false);

    // This is my own address from Ganache - testing account
    let adminAddress = "0xf7DafB6CFc4e156eE700d48084ee4dd5F492084A";
    let amountField;

    // Async function to handle submits of payment
    const handleSubmit = async () => {
        const data = new FormData();
        data.append('addr', adminAddress);
        data.append('ether', amountField.value);
        setError();
        await startPayment({
            setError,
            setTxs,
            setTransaction,
            ether: data.get("ether"),
            addr: data.get("addr")
        });
    };

    return (
        <MainContainer>

                {
                    !transaction &&
                    <ContentLeft>
                        <HeaderContainer id="content">
                            <LeftHeaderText>Join us</LeftHeaderText>
                            <LeftHeaderText>Today</LeftHeaderText>
                            <LeftSmallText>High profits and fresh memes. What else?</LeftSmallText>
                            {/* NEED TO MAKE THEM INLINE */}
                            <input ref={(elem) => amountField = elem} type="number" className="tokenNumber" placeholder="How many Yakhis?" min="1" pattern="[0-9]" name="number" id="numberOfToken" />
                            <span><SubmitButton onClick={handleSubmit} /></span>
                        </HeaderContainer>
                    </ContentLeft>
                }
                {
                    transaction &&
                    <ContentLeft>
                        <HeaderContainer id="content">
                            <LeftHeaderTextSmaller>Pleasure doing</LeftHeaderTextSmaller>
                            <LeftHeaderTextSmaller>business</LeftHeaderTextSmaller>
                        <LeftSmallText>Transaction ID: <span><LeftSmallTextYellow>{txs[0].hash}</LeftSmallTextYellow></span> </LeftSmallText>
                        <LeftSmallText>From (Your account): <span><LeftSmallTextYellow>{txs[0].from}</LeftSmallTextYellow></span> </LeftSmallText>
                        <LeftSmallText>To (Admin account): <span><LeftSmallTextYellow>{txs[0].to}</LeftSmallTextYellow></span> </LeftSmallText>
                        </HeaderContainer>
                    </ContentLeft>
                }

            <div className="parentOfAll">
                <div className="allGroups">
                    <IndividualImage className="Lady" imageVariant={item} imageSource={Lady} style={{ "z-index": "0" }} />
                    <IndividualImage className="Headset" imageVariant={item} imageSource={Headset} style={{ "z-index": "1" }} />
                    <IndividualImage className="Green" imageVariant={item} imageSource={Green} style={{ "z-index": "2" }} />
                    <IndividualImage className="Bulb" imageVariant={item} imageSource={Bulb} style={{ "z-index": "3" }} />
                    <IndividualImage className="Book" imageVariant={item} imageSource={Book} style={{ "z-index": "4" }} />
                    <IndividualImage className="BCRight" imageVariant={item} imageSource={BCRight} style={{ "z-index": "5" }} />
                    <IndividualImage className="BCLeft" imageVariant={item} imageSource={BCLeft} style={{ "z-index": "6" }} />
                    <IndividualImage className="BCBubble" imageVariant={item} imageSource={BCBubble} style={{ "z-index": "7" }} />
                    <IndividualImage className="BCBottom" imageVariant={item} imageSource={BCBottom} style={{ "z-index": "8" }} />
                    <IndividualImage className="Bag" imageVariant={item} imageSource={Bag} style={{ "z-index": "9" }} />
                </div>
            </div>
        </MainContainer>
    );
}

export default LandingPage;