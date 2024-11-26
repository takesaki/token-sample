import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";

import 'dotenv/config';

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    polygonAmoy: {
      url: "https://rpc-amoy.polygon.technology/",
      accounts: [`0x${process.env.AMOY_PRIVATE_KEY}`]
    },
    hardhat: {
    }
  },
};

export default config;
