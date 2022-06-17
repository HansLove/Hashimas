const Hashima = artifacts.require("Hashima");
const Auction = artifacts.require("Auction");
const HashiToken = artifacts.require("Hashi");
const OtherSide = artifacts.require("OtherSide");
const Server = artifacts.require("Server");


module.exports =async function (deployer) {
  await deployer.deploy(Hashima);
  await deployer.deploy(Auction,Hashima.address)
  await deployer.deploy(HashiToken,Hashima.address)
  await deployer.deploy(OtherSide,HashiToken.address)
  await deployer.deploy(Server,Hashima.address)

};
