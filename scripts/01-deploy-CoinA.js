const { ethers, network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_MUMBAI_URL)
  const [deployer] = await ethers.getSigners()

  const CoinA = await ethers.getContractFactory("CoinA", deployer)
  const coinA = await CoinA.deploy()

  const deploymentTx = coinA.deploymentTransaction()
  await provider.waitForTransaction(deploymentTx.hash, 3)

  const coinAAddress = await coinA.getAddress()
  console.log("CoinA is deployed to ", coinAAddress)

  const args = []

  if (
    !developmentChains.includes(network.name) &&
    process.env.POLYGONSCAN_API_KEY
  ) {
    console.log("Verifying...")
    await verify(coinAAddress, "CoinA", args)
  }
  console.log("---------------------")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
