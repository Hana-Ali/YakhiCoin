// Importing react
import React, { useState, useEffect } from 'react';
// Importing css
import './Block.css';

function Block(props) {

    // BLOCK INFORMATION as state
    const [blockInfo, setBlockInfo] = useState([{
        index:'',
        from: '',
        to: '',
        timestamp: '',
        amount: '',
        fee: '',
        reward: '',
        miner: '',
        previoushash: '',
        hash: '',
        nonce: '',
    }]);
    // useEffect() will constantly fetch the blocks and block info, and set it in blockInfo state
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/list-blocks`)
        .then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes => setBlockInfo(jsonRes));
    })

        return(
            <div>
            { 
                blockInfo.map(
                    (blocks) => {
                    return(
                    <div className="CardContainer">
                        <div className="face faceInner">
                            <div className="content">
                                <h2 className="BlockName">Block {blocks.index} <span className="h2Span">{blocks.timestamp}</span></h2>
                                <hr className="separator" />
                                <p className="previousHashTitle">Previous Hash <p className="previousHash">{blocks.previoushash}</p></p>
                                <p className="currentHashTitle">To<p className="midHash">{blocks.to}</p></p>
                                <p className="currentHashTitle">From<p className="midHash">{blocks.from}</p></p>
                                <p className="currentHashTitle">Miner<p className="midHash">{blocks.miner}</p></p>
                                <p className="currentHashTitle">Amount<p className="midHash">{blocks.amount} YAKHIs</p></p>
                                <p className="currentHashTitle">Reward<p className="midHash">{blocks.reward} YAKHIs</p></p>
                                <p className="currentHashTitle">Fee<p className="midHash">{blocks.fee} YAKHIs</p></p>
                                <p className="currentHashTitle">Hash <p className="currentHash">{blocks.hash}</p></p>
                            </div>
                        </div>
                        <div className="face faceOuter">
                            <h2 className="h2Outer">{blocks.nonce}</h2>
                        </div>
                    </div>
                    )
                })
            }
            </div>
        );
}

export default Block;