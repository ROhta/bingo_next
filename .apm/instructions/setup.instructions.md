---
description: bingo_next の本番環境とローカル環境構築手順
applyTo: "**/{mise.toml,package.json,pnpm-workspace.yaml,pnpm-lock.yaml,tsconfig.json,*.tf,*.tfvars}"
---

# 環境構築

## 必要アカウント

- [Vercel](https://vercel.com/) — アプリケーションのホスティングと監視
- [HashiCorp Cloud](https://cloud.hashicorp.com/) — Terraform Cloud バックエンド

## application (Next.js)

- `git clone`
- [mise](https://mise.jdx.dev/) を導入する (node / pnpm / terraform / apm のバージョン管理に使用)
  - Linux ホストでは pnpm (Node SEA バイナリ) が `libatomic.so.1` を要求するため `libatomic1` を導入しておく (例: `sudo apt-get install -y libatomic1`)。GitHub Actions の `ubuntu-latest` には標準装備のため CI では不要。
- `mise trust && mise install` で `mise.toml` に固定された各ツールを導入する
  - 以降 `node` / `pnpm` / `terraform` / `apm` が mise 管理版を指すよう、シェルで mise を有効化する (`mise activate` を shell rc に追加。導入方法は[公式手順](https://mise.jdx.dev/getting-started.html)を参照)。有効化しない場合は各コマンドを `mise exec -- <cmd>` で実行する。
- アプリケーションのインストールと起動 (`application/` で実行)
  - `pnpm i --frozen-lockfile`
  - `pnpm run dev`
- husky の設定
  - `application/.husky/pre-commit` に実行権限がなく、`lint-staged` が実行されない場合もある
  - その場合、実行権限を付与した上で、git 設定を確認する
  - `git update-index --add --chmod=+x application/.husky/pre-commit`
  - `git config core.filemode false`

## iac (Terraform)

- terraform は `mise.toml` で管理する (`mise install` 済みなら追加導入は不要)。バージョン制約は `iac/hosting/versions.tf` の `required_version` を参照。
- `iac/hosting/` ディレクトリで以下を実行
  - `terraform login`
  - `terraform init`

## バージョン管理 (mise)

node / pnpm / terraform / apm CLI のバージョンはリポジトリ直下の `mise.toml` を唯一の真実源 (SSoT) とする。更新時は `mise.toml` を編集して `mise install` する (apm の `apm self-update` / `apm doctor` の更新催促には従わない)。

- ローカル / CI ともに同じ `mise.toml` を消費する (CI は `jdx/mise-action` 経由で node / pnpm のみ install)。
- ただし mise が届かない実行環境が 2 つあり、それぞれ別途バージョンを保持・同期する:
  - **Vercel 本番ビルド**: node は `iac/hosting/project.tf` の `node_version`、pnpm は `package.json` の `packageManager` (corepack) で解決する。`mise.toml` の値と整合させること。
  - **Terraform Cloud リモート実行**: terraform 版は TFC workspace の設定で解決する。`iac/hosting/versions.tf` の `required_version` 制約を満たすこと。
- mise 本体は最低 2026.6.1 を要する (pnpm 11.5.2 の aqua アセット解決に必要)。
