require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const your_private_key = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

module.exports = {
  defaultNetwork: "hardhat",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/70ce373aa396409daa27ea1f1580fb3c",
      accounts: [`0x${your_private_key}`]
    },
      goli: {
      url: "https://goerli.infura.io/v3/70ce373aa396409daa27ea1f1580fb3c",
      accounts: [`0x${your_private_key}`]
    },

  },
  solidity: "0.8.0",
};