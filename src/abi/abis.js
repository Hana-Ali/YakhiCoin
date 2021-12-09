export const YakhiTokenABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "tokensSold",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
        }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "tokenContract",
        "outputs": [
            {
                "name": "",
                "type": "address"
        }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "tokenPrice",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
        }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "_tokenContract",
                "type": "address"
        },
            {
                "name": "_tokenPrice",
                "type": "uint256"
        }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_buyer",
                "type": "address"
        },
            {
                "indexed": false,
                "name": "_amount",
                "type": "uint256"
        }
        ],
        "name": "Sell",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_numberOfTokens",
                "type": "uint256"
        }
        ],
        "name": "buyTokens",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "endSale",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]