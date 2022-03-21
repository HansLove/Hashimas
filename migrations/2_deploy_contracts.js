const Hashima = artifacts.require("Hashima");
const Certificado = artifacts.require("Certificado");
const Auction = artifacts.require("Auction");
const HashiToken = artifacts.require("Hashi");


module.exports =async function (deployer) {
  await deployer.deploy(Hashima);
  await deployer.deploy(Certificado);
  await deployer.deploy(Auction,Hashima.address)
  await deployer.deploy(HashiToken,Hashima.address)

};
