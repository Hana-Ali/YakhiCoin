// Importing React
import React, { useContext, useState } from 'react';
// Importing Styled
import styled from 'styled-components';
// Importing motion
import { motion } from 'framer-motion';
// Importing wallet icon
import { Wallet } from '@styled-icons/boxicons-solid/Wallet';
// Importing UserContext
import { UserContext } from '../../UserContext';
// Importing css
import './UserWallet.css';

// Just for the initial
const initialContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
};

// Container for the box
const FullContainer = styled(motion.div)`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 7px 1px rgba(31, 31, 31, 0.2);
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
    text-align: center;
    padding: 0 1.8em;
    padding-bottom: 5em;
    padding-top: 2.5em;
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
    left: -215px;
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
    padding-top: 5px;
`;

// For what would be inside as forms and so
const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1.8rem;
`;

const WalletIconContainer = styled.div`
    display: flex;
    text-align: center;
    height: 125px;
    width: 125px;
    border-radius: 3px;
    color: black;
    margin: 0 auto;
`;

const WalletIcon = styled(Wallet)`
    position: absolute;
    text-align: center;
    width: 125px;
    height: 125px;
    color: white;
    margin: 0 auto;
`;

const MiddleContainer = styled.div`
    text-align: center;
    margin: 0 auto;
    border-radius: 19px;
    background: #6A1C2B;
    margin-top: 20px;
    width: 250px;
    height: 70px;
`;

const BalanceText = styled.h2`
    font-size: 30px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    line-height: 1.24;
    color: #fff;
    z-index: 10;
    margin: 0 auto;
    justify-content: center;
    padding-top: 18px;
`;
const TransactionText = styled.p`
    word-wrap:break-word;
    padding-left: 25px;
    color: #6A1C2B;
    font-weight: 500;
`;

const TransactionText1 = styled.p`
    padding-left: 25px;
    word-wrap:break-word;
    color: #6A1C2B;
    font-weight: 500;
`;

const SmallerTransaction = styled.p`
    font-size: 10.5px;
    font-family: 'Roboto Mono', monospace;
    margin-top: 5px;
    border-radius: 5px;
    padding: 3px;
    color: rgb(167, 166, 166);
    word-wrap:break-word;
    max-width: 550px;
`

const TimeStampText = styled.p`
    font-size: 10.5px;
    font-family: 'Roboto Mono', monospace;
    text-align: center;
    margin-top: 25px;
    border-radius: 5px;
    padding: 3px;
    color: rgb(167, 166, 166);
    word-wrap:break-word;
`

const TimeStampText2 = styled.p`
    font-size: 10.5px;
    font-family: 'Roboto Mono', monospace;
    text-align: center;
    border-radius: 5px;
    padding: 3px;
    color: rgb(167, 166, 166);
    word-wrap:break-word;
`

const HashContainer = styled.p`
    font-size: 10.5px;
    font-family: 'Roboto Mono', monospace;
    text-align: center;
    margin-top: 5px;
    border: 1px;
    border-style: solid;
    border-color: #6A1C2B;
    color: #6A1C2B;
    background-color: #faecef;
    border-radius: 5px;
    padding: 3px;
`

function UserWallet(props) {
    // Getting shared context value
    const { state: { pub } } = useContext(UserContext);
    // Wallet is a state that contains all user wallet info
    const [wallet, setWallet] = useState({
        transactions: [{
            amount: '',
            fee: '',
            from: '',
            hash: '',
            index: '',
            miner: '',
            nonce: '',
            previoushash: '',
            reward: '',
            timestamp: '',
            to: '',
            _id: ''
        }],
        balance: ''
    });

    // BlockInfo is what will be sent to the backend as the user's public key to know their balance
    let blockInfo = { "address":"" };
    blockInfo.address = pub;
    // Send backend request to get user balance
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/view-address`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(blockInfo)
    }).then((res) => {
        if (res.ok) {
            return res.json()
        }
    }).then((jsonRes) => {
        // Setting wallet
        setWallet(jsonRes)
    }).catch((error) => {
        console.log('error', error)
    })

    return(
        <FullContainer
        variants={initialContainer}
        initial="hidden"
        animate="show"
        >
            <BoxContainer>

                <TopContainer>
                    <BackDrop />
                    <WalletIconContainer>
                        <WalletIcon />
                    </WalletIconContainer>
                    <HeaderContainer>
                        <HeaderText>Wallet</HeaderText>
                    </HeaderContainer>
                </TopContainer>

                <InnerContainer className="innerContainer">
                    <MiddleContainer>
                        <BalanceText>${wallet.balance}</BalanceText>
                    </MiddleContainer>

                    {
                        wallet.transactions.map(
                            (trans) => {
                                return(
                                    <div>
                                        <div className="individualTransaction">
                                            
                                            <TimeStampText>{trans.timestamp}</TimeStampText>
                                            <TimeStampText2>Transaction #{trans._id}</TimeStampText2>

                                            <TransactionText1>FROM:<span>
                                                <SmallerTransaction>{trans.from}</SmallerTransaction>
                                            </span></TransactionText1>

                                            <TransactionText>TO:<span>
                                                <SmallerTransaction>{trans.to}</SmallerTransaction>
                                            </span></TransactionText>

                                            <TransactionText>AMOUNT:<span>
                                                <SmallerTransaction>{trans.amount} YAKHIS</SmallerTransaction>
                                            </span></TransactionText>

                                            <TransactionText>MINER:<span>
                                                <SmallerTransaction>{trans.miner}</SmallerTransaction>
                                            </span></TransactionText>

                                            <TransactionText>REWARD:<span>
                                                <SmallerTransaction>{trans.reward} YAKHIS</SmallerTransaction>
                                            </span></TransactionText>

                                            <TransactionText>FEE:<span>
                                                <SmallerTransaction>{trans.fee} YAKHIS</SmallerTransaction>
                                            </span></TransactionText>

                                            <HashContainer>{trans.hash}</HashContainer>
                                            
                                        </div>
                                        <hr className="separator" />
                                    </div>
                                )
                            }
                        )
                    }
                    
                </InnerContainer>
            </BoxContainer>

        </FullContainer>
    );
}

export default UserWallet;