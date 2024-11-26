# Sample Hardhat Project

## ここから読めばOK

パッケージのインストール

```sh
npm ci
```

スマートコントラクトのコンパイル

```sh
npx hardhat compile
```

スマートコントラクトの自動テスト

```sh
npx hardhat test --network hardhat
```

## ローカルにEVMの構築【動作確認用】

```sh
npx hardhat node
```

ここでとれた秘密鍵はメタマスクにインポートすることができる

## スマートコントラクト（ERC20トークン）のデプロイ

### 以下の.envファイルをトップディレクトリに用意

```env
TOKEN_NAME=MyToken    # トークンの名前、なんでもいい
TOKEN_SYMBOL=MTK      # トークンのシンボル、なんでもいい
AMOY_PRIVATE_KEY=     # METAMASKの秘密鍵を書く
```

ローカルでテストする時はこれ（別ターミナルを開いて実行）

```sh
npx hardhat clean
npx hardhat ignition deploy ./ignition/modules/Token.ts --network localhost
```

Amoyにデプロイするときはこれを使う

```sh
npx hardhat ignition deploy ./ignition/modules/deploy.ts --network polygonAmoy
```
