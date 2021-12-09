// import NFTContractBuild from 'contracts/NFT.json';
import Web3 from 'web3';
import YakhiTokenSale from '../../contracts/YakhiTokenSale.json';

let selectedAccount;

let yakhiContract;
let isInitialized = false;

export const init = async () => {
    let provider = window.ethereum;

    if (typeof provider !== 'undefined') {
        provider
            .request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                selectedAccount = accounts[0];
                console.log(`Selected account is ${selectedAccount}`);
            })
            .catch((err) => {
                console.log(err);
                return;
            });

        window.ethereum.on('accountsChanged', function (accounts) {
            selectedAccount = accounts[0];
            console.log(`Selected account changed to ${selectedAccount}`);
        });
    }

    const web3 = new Web3(provider);

    const networkId = await web3.eth.net.getId();

    yakhiContract = new web3.eth.Contract(
    	YakhiTokenSale.abi,
    	YakhiTokenSale.networks[networkId].address
    );
    
    console.log('Address: ', YakhiTokenSale.networks[networkId].address)
};

// export const getOwnBalance = async () => {
//     if (!isInitialized) {
//         await init();
//     }

//     return erc20Contract.methods
//         .balanceOf(selectedAccount)
//         .call()
//         .then((balance) => {
//             return Web3.utils.fromWei(balance);
//         });
// };

// export const mintToken = async () => {
// 	if (!isInitialized) {
// 		await init();
// 	}

// 	return nftContract.methods
// 		.mint(selectedAccount)
// 		.send({ from: selectedAccount });
// };