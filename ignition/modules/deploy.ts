import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

import 'dotenv/config';

const TokenName :string = String(process.env.TOKEN_NAME);
const TokenSymbol :string= String(process.env.TOKEN_SYMBOL);
const initialSupply :number= 1000;

const TokenModule = buildModule("TokenModule", (m) => {
  // Deploy a token contract, set the initial supply, the name and the symbol.
  const token = m.contract("SampleToken", [initialSupply, TokenName, TokenSymbol]);

  return { token };
});

module.exports = TokenModule;
