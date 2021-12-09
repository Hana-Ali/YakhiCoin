// Import react
import React, { useContext, useState, useEffect } from 'react';
// Import styled components
import styled from 'styled-components';
// Import motion
import { motion } from 'framer-motion';
// Import css
import './Transaction.css';
// Import user context
import { UserContext }  from '../../UserContext';

const Wrapper = styled.div`
    margin: 0 auto;
    width: 80%;
`;

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
    margin-left: 37%;
    margin-top: 50px;

    &:hover {
        cursor: pointer;
        background-color: #A42C43;
    }

`;

function Transaction(props) {

    // TRANSACTION INFORMATION as state
    const { state: { pub } } = useContext(UserContext);
    // Transaction state contains this information, will obtain from backend
    const [transactions, setTrans] = useState([{
        _id:'',
        from: '',
        to: '',
        amount: '',
        fee: ''
    }]);

    // useEffect will constantly get backend info about pending transactions
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/list-transactions`).then(async res => {
            const data = await res.json();
            if (!res.ok) {
                const error = (data && data.message) || res.statusText;
                return Promise.reject(error);
            }
            setTrans(data);
            console.log('transactions', transactions);
        }).catch((error) => {
            console.log('error', error)
        })
    });

    // Function to mine transactions when user clicks on the mine button
    function mineTransactions(item) {
        // BlockInfo is what will be sent to the backend to mine
        // ID is transaction ID, address is address of current user, obtained from global context state
        let blockInfo = { "id": "", "address":"" }
        blockInfo.id = item;
        blockInfo.address = pub;
        console.log('blockInfo', blockInfo)
        // If item is not NULL - transaction exists
        if(item) {
            // Send the block info to backend
            fetch(`${process.env.REACT_APP_API_ENDPOINT}/mine-block`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(blockInfo)
            })
        }
    }
    
    return(
        <Wrapper>
            <motion.h2
            className="mainTitle">
                Transactions
            </motion.h2>
            {
                transactions.map(
                    (trans, index) => {
                        return(
                            <div className="list">
                                <div className="num" key={index}>
                                    <h3 className="innerNumber">{index + 1}</h3>
                                    <motion.h3 
                                    initial={{ x:0 }}
                                    whileHover={{ x: 25 }}
                                    transition={{ ease: "easeOut", duration: 0.25 }}
                                    className="title">
                                        Transaction {trans._id}
                                    </motion.h3>
                                </div>


                                <div className="row g-0 underNum">
                                    <div className="leftUnder col">
                                        <p className="underTextBold">AMOUNT: <span className="underTextSmall">{trans.amount}</span> </p>
                                        <p className="underTextBold2">FROM: <span className="underTextSmall">{trans.from}</span> </p>
                                        <p className="underTextBold2">TO: <span className="underTextSmall">{trans.to}</span> </p>
                                        <p className="underTextBold2">FEE: <span className="underTextSmall">{trans.fee}</span> </p>
                                    </div>
                                    <div className="underRight col">
                                        <SubmitButton onClick={function(){mineTransactions(trans._id)}}>MINE</SubmitButton>
                                    </div>
                                </div>
                            </div>
                        )
                    })
            }
            
        </Wrapper>  
    );
}

export default Transaction;