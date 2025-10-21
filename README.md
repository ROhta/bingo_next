# bingo_next

## 概要

- アプリケーションは Next.js
  - アプリケーションコードは v0 で作成
- ホスティングと監視は vercel
- IaC は terraform により構築

## 必要アカウント

- Vercel
- Hashicorp Cloud

## 環境構築

### application

- git clone
- volta を設定
- volta により、node と pnpm を package.json で指定されたバージョンをインストールする
  - `volta install node@${指定バージョン}`
  - `volta install pnpm@${指定バージョン}`
- アプリケーションのインストールと起動
  - `pnpm i --frozen-lockfile`
  - `pnpm run dev`
- husky の設定
  - application/.husky/pre-commit に実行権限がなく、lint-staged が実行されない場合もある
  - その場合、実行権限を付与した上で、git 設定を確認する
  - `git update-index --add  --chmod=+x application/.husky/pre-commit`
  - `git config core.filemode false`

### iac

- terraform をローカルにインストール
  - terraform のバージョンは main.tf を参照
- iac ディレクトリで以下を実行
  - `terraform login`
  - `terraform init`
