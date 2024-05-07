import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import 'dotenv/config';

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    polygonAmoy: {
      url: "https://rpc.ankr.com/polygon_amoy",
      accounts: [`0x${process.env.AMOY_PRIVATE_KEY}`]
    },
  },
};

export default config;
