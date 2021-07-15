import { ethers } from 'ethers'
import Ballot from './artifacts/contracts/Ballot.sol/Ballot.json'


// // Update with the contract address logged out to the CLI when it was deployed 
const voterAddress = "0x12Aeb4648CfDaE7589580D6f4E6C901f12800aC2"

  // request access to the user's MetaMask account
//   async function requestAccount() {
//     await window.ethereum.request({ method: 'eth_requestAccounts' });
//   }

  // call the smart contract, read the current greeting value
  export async function fetchProporsals() {
      let provider; 
    if (typeof window.ethereum !== 'undefined') {
    //   provider = new ethers.providers.Web3Provider(window.ethereum)
      provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/70ce373aa396409daa27ea1f1580fb3c");
      const contract = new ethers.Contract(voterAddress, Ballot.abi, provider)
      try {
        const data = await contract.fetchProposals()
        console.log('data: ', data);
        return data;
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

//   // call the smart contract, send an update
  export async function vote(proporsal, up, down) {
      console.log(proporsal, up, down);
    if (proporsal === null || up === null || down === null) return
    if (typeof window.ethereum !== 'undefined') {
    //   await requestAccount();
      const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/70ce373aa396409daa27ea1f1580fb3c");
      const signer = provider.getSigner(voterAddress)
      const contract = new ethers.Contract(voterAddress, Ballot.abi, signer)
        console.log(provider, contract);

      const transaction = await contract.vote(proporsal, up, down)
      await transaction.wait()
      return await fetchProporsals()
    }
  }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <button onClick={fetchGreeting}>Fetch Greeting</button>
//         <button onClick={setGreeting}>Set Greeting</button>
//         <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />
//       </header>
//     </div>
//   );
// }
