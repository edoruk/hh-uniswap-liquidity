const axios = require("axios")
const { ethers } = require("hardhat")
require("dotenv")

const UNISWAP_V3_FACTORY_ADDRESS = "0x1F98431c8aD98523631AE4a59f267346ea31F984"
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY

const MUMBAI_PROVIDER = new ethers.JsonRpcProvider(
  process.env.ALCHEMY_MUMBAI_URL
)
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const PRIVATE_KEY = process.env.PRIVATE_KEY_ADDRESS
const COINA_ADDRESS = "0x3bF77d737fddf3d3286eC44649bb86D1750260EC"
const COINB_ADDRESS = "0xd5aAC4aaB6Eb8Cb1cD7f131374D9bE3B278621d9"

const wallet = new ethers.Wallet(PRIVATE_KEY)
const connectedWallet = wallet.connect(MUMBAI_PROVIDER)

async function main() {
  const url = `https://api.polygonscan.com/api?module=contract&action=getabi&address=${UNISWAP_V3_FACTORY_ADDRESS}&apikey=${POLYGONSCAN_API_KEY}`
  const res = await axios.get(url)
  const abi = JSON.parse(res.data.result)
  const factoryContract = new ethers.Contract(
    UNISWAP_V3_FACTORY_ADDRESS,
    abi,
    MUMBAI_PROVIDER
  )
  const tx = await factoryContract
    .connect(connectedWallet)
    .createPool(COINA_ADDRESS, COINB_ADDRESS, 500)
  const receipt = await tx.wait()
  console.log("receipt:", receipt)
  const newPoolAddress = await factoryContract.getPool(
    COINA_ADDRESS,
    COINB_ADDRESS,
    500
  )
  console.log("newPoolAddress: ", newPoolAddress)
  //0x834957b7090F3D708782468c4f340Ab87c690158 -> pool address
  //0x43F10B59857169302B2863A9072c48f9aD546A5E -> tokenA
  //0x9BE7a814c46215edFa862e82500CcCa135C734B0 -> tokenB
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
