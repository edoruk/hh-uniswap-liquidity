const networkConfig = {
  default: {
    name: "hardhat",
  },
  localhost: {
    chainId: 31337,
  },
  31337: {
    name: "hardhat",
  },
  80001: {
    name: "mumbai",
  },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = {
  networkConfig,
  developmentChains,
}
