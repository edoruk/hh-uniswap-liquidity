const { ethers, network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_MUMBAI_URL)
  const [deployer] = await ethers.getSigners()

  const Pool = await ethers.getContractFactory("LiquidityPool", deployer)
  const pool = await Pool.deploy()

  const deploymentTx = pool.deploymentTransaction()
  await provider.waitForTransaction(deploymentTx.hash, 3)

  const contractAddress = await pool.getAddress()

  console.log("Add Liquidity contract is deployed to ", contractAddress)

  const args = []

  if (
    !developmentChains.includes(network.name) &&
    process.env.POLYGONSCAN_API_KEY
  ) {
    console.log("Verifying...")
    await verify(contractAddress, "LiquidityPool", args)
  }
  console.log("---------------------")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
