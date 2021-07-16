import { ethers } from 'ethers'
import Ballot from './artifacts/contracts/Ballot.sol/Ballot.json'


// // Update with the contract address logged out to the CLI when it was deployed 
let voterAddress;
let provider;
if (process.env.NODE_ENV === 'production') {
  provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/70ce373aa396409daa27ea1f1580fb3c");
  voterAddress = "0x12Aeb4648CfDaE7589580D6f4E6C901f12800aC2"
} else if(process.env.NODE_ENV === 'development') {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  voterAddress = "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F"

}



  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // call the smart contract, read the current greeting value
  export async function fetchProporsals() {
    try {
      // let provider; 
      // provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/70ce373aa396409daa27ea1f1580fb3c");
      // provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(voterAddress, Ballot.abi, provider);
      try {
        const data = await contract.fetchProposals();
        console.log('data: ', data);
        return data;
      } catch (err) {
        console.log("Error: ", err)
      }
    } catch(error) {
      console.log("Error: ", error)
      return error
    }  
  }

//   // call the smart contract, send an update
  export async function vote(proporsal, up, down) {
      console.log(proporsal, up, down);
      try {
        if (proporsal === null || up === null || down === null) return
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        requestAccount()
        const signer = provider.getSigner()
        const contract = new ethers.Contract(voterAddress, Ballot.abi, signer)
        console.log(provider, contract);
        const transaction = await contract.vote(proporsal, up, down)
        await transaction.wait()
        return await fetchProporsals()
      }
      else {
        const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/70ce373aa396409daa27ea1f1580fb3c");
        const signer = provider.getSigner(voterAddress)
        const contract = new ethers.Contract(voterAddress, Ballot.abi, signer)
        console.log(provider, contract);
        const transaction = await contract.vote(proporsal, up, down)
        await transaction.wait()
        return await fetchProporsals()
      }
    }
    catch(error) {
      console.log("Error: ", error)
      return error
    }  
  }