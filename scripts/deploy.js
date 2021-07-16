const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, World!");

  const Ballot = await hre.ethers.getContractFactory("Ballot");
  const ballot = await Ballot.deploy(["mike", "sunday", "uche"]);

  await greeter.deployed();
  await ballot.deployed();
  
  console.log("Greeter deployed to:", greeter.address);
  console.log("Ballot deployed to:", ballot.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });