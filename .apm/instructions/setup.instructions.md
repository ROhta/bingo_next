---
description: bingo_next の本番環境とローカル環境構築手順
applyTo: "**/{package.json,pnpm-lock.yaml,tsconfig.json,*.tf,*.tfvars}"
---

# 環境構築

## 必要アカウント

- [Vercel](https://vercel.com/) — アプリケーションのホスティングと監視
- [HashiCorp Cloud](https://cloud.hashicorp.com/) — Terraform Cloud バックエンド

## application (Next.js)

- `git clone`
- volta を設定
- volta により、node と pnpm を `package.json` で指定されたバージョンをインストールする
  - `volta install node@${指定バージョン}`
  - `volta install pnpm@${指定バージョン}`
- アプリケーションのインストールと起動
  - `pnpm i --frozen-lockfile`
  - `pnpm run dev`
- husky の設定
  - `application/.husky/pre-commit` に実行権限がなく、`lint-staged` が実行されない場合もある
  - その場合、実行権限を付与した上で、git 設定を確認する
  - `git update-index --add --chmod=+x application/.husky/pre-commit`
  - `git config core.filemode false`

## iac (Terraform)

- terraform をローカルにインストール
  - terraform のバージョンは `iac/hosting/versions.tf` を参照
- `iac/hosting/` ディレクトリで以下を実行
  - `terraform login`
  - `terraform init`
