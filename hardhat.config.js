require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
const DEFAULT_COMPILER_SETTINGS = {
  version: "0.7.6",
  settings: {
    optimizer: {
      enabled: true,
      runs: 1_000_000,
    },
    metadata: {
      bytecodeHash: "none",
    },
  },
}
const DEFAULT2_COMPILER_SETTINGS = {
  version: "0.8.20",
  settings: {
    optimizer: {
      enabled: true,
      runs: 1_000_000,
    },
    metadata: {
      bytecodeHash: "none",
    },
  },
}
module.exports = {
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS, DEFAULT2_COMPILER_SETTINGS],
  },

  networks: {
    polygonMumbai: {
      url: process.env.ALCHEMY_MUMBAI_URL,
      accounts: [process.env.PRIVATE_KEY_ADDRESS],
      chainId: 80001,
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
}
