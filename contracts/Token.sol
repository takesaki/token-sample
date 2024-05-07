// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SampleToken is ERC20, Ownable{
  
  mapping(string => address) public idMap;

  constructor(uint initialSupply, string memory name, string memory symbol) ERC20(name, symbol) Ownable(msg.sender) {

    _mint(msg.sender, initialSupply);
  }

  function decimals() override public pure returns (uint8) {
    return 0;
  }
  
  function mint(address to, uint256 amount) public onlyOwner {
    _mint(to, amount);
    emit MintEvent(to, amount);
  }

  function burn(address account, uint256 amount) public onlyOwner {
    _burn(account, amount);
    emit BurnEvent(account, amount);
  }

  event MintEvent(address indexed to,uint256 indexed amount);
  event BurnEvent(address indexed account,uint256 indexed amount);

}