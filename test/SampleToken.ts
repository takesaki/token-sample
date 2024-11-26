// test/Token.test.ts

import { expect } from "chai";
import { ethers } from "hardhat";
import { SampleToken } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("SampleTokenTest", function () {
  let token: SampleToken;
  let owner: HardhatEthersSigner;
  let addr1: HardhatEthersSigner;
  let addr2: HardhatEthersSigner;

  // 各テストの前に実行
  beforeEach(async function () {
    // コントラクトのデプロイ
    const TokenFactory = await ethers.getContractFactory("SampleToken");
    [owner, addr1, addr2] = await ethers.getSigners();
    token = await TokenFactory.deploy( ethers.parseEther("1000"), "SampleToken", "STK",);
    await token.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await token.owner()).to.equal(await owner.getAddress());
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await token.balanceOf(await owner.getAddress());
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      // addr1に100トークンを送信
      await token.transfer(await addr1.getAddress(), 100);
      expect(await token.balanceOf(await addr1.getAddress())).to.equal(100);

      // addr1からaddr2に50トークンを送信
      await token.connect(addr1).transfer(await addr2.getAddress(), 50);
      expect(await token.balanceOf(await addr2.getAddress())).to.equal(50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await token.balanceOf(await owner.getAddress());
      
      // addr1は50トークンなので、送信は失敗するはず
      await expect(
        token.connect(addr1).transfer(await owner.getAddress(), 100)
      ).to.be.reverted;

      // オーナーの残高は変わっていないことを確認
      expect(await token.balanceOf(await owner.getAddress())).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update allowances on approve", async function () {
      await token.approve(await addr1.getAddress(), 100);
      expect(await token.allowance(await owner.getAddress(), await addr1.getAddress()))
        .to.equal(100);
    });

    it("Should transfer tokens using transferFrom", async function () {
      await token.approve(await addr1.getAddress(), 100);
      await token.connect(addr1).transferFrom(
        await owner.getAddress(),
        await addr2.getAddress(),
        50
      );
      expect(await token.balanceOf(await addr2.getAddress())).to.equal(50);
    });
  });
});