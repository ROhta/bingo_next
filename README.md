# bingo_next

## 概要

- アプリケーションはNext.js
  - アプリケーションコードはv0で作成
- ホスティングと監視はvercel
- IaCはterraformにより構築

## 必要アカウント

- Vercel
- Hashicorp Cloud

## 環境構築

### application

- git clone
- voltaを設定
- voltaにより、nodeとpnpmをpackage.jsonで指定されたバージョンをインストールする
  - `volta install node@${指定バージョン}`
  - `volta install pnpm@${指定バージョン}`
- アプリケーションのインストールと起動
  - `pnpm i --frozen-lockfile`
  - `pnpm run dev`
- huskyの設定
  - application/.husky/pre-commitに実行権限がなく、lint-stagedが実行されない場合もある
  - その場合、実行権限を付与した上で、git設定を確認する
    - `git update-index --add  --chmod=+x application/.husky/pre-commit`
    - `git config core.filemode false`

### iac

- tfenvを使用してterraformをインストール（推奨）
  - tfenvをインストール: `brew install tfenv` (macOS) または [tfenv GitHub](https://github.com/tfutils/tfenv)を参照
  - プロジェクトルートの`.terraform-version`ファイルにより、適切なバージョンが自動的に使用されます
  - `tfenv install` でバージョンをインストール
  - または、terraformを直接インストールすることも可能
    - terraformのバージョンはmain.tfを参照
- iacディレクトリで以下を実行
  - `terraform login`
  - `terraform init`

## エディター

- cursorを想定
