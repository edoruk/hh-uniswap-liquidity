const { ethers, network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_MUMBAI_URL)
  const [deployer] = await ethers.getSigners()

  const CoinB = await ethers.getContractFactory("CoinB", deployer)
  const coinB = await CoinB.deploy()

  const deploymentTx = coinB.deploymentTransaction()
  await provider.waitForTransaction(deploymentTx.hash, 3)

  const coinBAddress = await coinB.getAddress()

  //0x553F617849D65555d43D51CbDB7c8E24cAcD2f4a

  console.log("CoinB is deployed to ", coinBAddress)
  const args = []
  if (
    !developmentChains.includes(network.name) &&
    process.env.POLYGONSCAN_API_KEY
  ) {
    console.log("Verifying...")
    await verify(coinBAddress, "CoinB", args)
  }
  console.log("---------------------")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
