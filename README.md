# bingo_next

## 概要

- アプリケーションはNext.js
  - アプリケーションコードはv0で作成
- ホスティングと監視はvercel
  - IaCはterraformにより構築

## 必要アカウント

- vercel
- Terraform Cloud

## 環境構築

### application

- 以下をローカルにインストールする
  - volta
  - voltaでnodeをインストール
  - voltaでpnpmをインストール
  - nodeとpnpmのバージョンはpackage.jsonを参照
- `pnpm run build`
- `pnpm run dev`

### iac

- terraformをローカルにインストール
  - terraformのバージョンはmain.tfを参照
- iacディレクトリで以下を実行
  - `terraform login`
  - `terraform init`

## エディター

- cursorを想定
