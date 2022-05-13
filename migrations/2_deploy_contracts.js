const Hashima = artifacts.require("Hashima");
const NoHashima = artifacts.require("NoHashima");
const Auction = artifacts.require("Auction");
const HashiToken = artifacts.require("Hashi");
const NewHashima = artifacts.require("NewHashima");



module.exports =async function (deployer) {
  await deployer.deploy(Hashima);
  await deployer.deploy(NoHashima);
  await deployer.deploy(Auction,Hashima.address)
  // await deployer.deploy(HashiToken,Hashima.address)
  await deployer.deploy(HashiToken)

  await deployer.deploy(NewHashima);

  

};
