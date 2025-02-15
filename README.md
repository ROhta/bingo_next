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

- git clone
- voltaを設定
- voltaにより、nodeとpnpmをpackage.jsonで指定されたバージョンに設定
- `pnpm i --frozen-lockfile`
- `pnpm run dev`

### iac

- terraformをローカルにインストール
  - terraformのバージョンはmain.tfを参照
- iacディレクトリで以下を実行
  - `terraform login`
  - `terraform init`

## エディター

- cursorを想定
