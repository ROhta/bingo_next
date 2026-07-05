# bingo_next

v0 と Terraform Cloud を使った bingo の Next.js 再実装。

## 概要

- アプリケーションは Next.js (アプリケーションコードは v0 で作成)
- ホスティングと監視は Vercel
- IaC は Terraform により構築

## ドキュメント

リポジトリ固有のドキュメント (環境構築手順) は AI エージェント向け指示と共通化しており、[`.apm/instructions/`](./.apm/instructions/) 配下に集約されています。

| ファイル                                                                       | 内容                                                                                                  |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| [`setup`](./.apm/instructions/setup.instructions.md)                           | 必要アカウント・ローカル環境構築手順 (application / iac)                                              |

他リポジトリ共通の指示 (PR レビュー方針・APM 運用ルール・使用言語・開発フロー等) は共通パッケージ [`ROhta/apm-config`](https://github.com/ROhta/apm-config) から `apm install` で配信され、ローカルの `.apm/instructions/` には保持しません。共通指示を変更したい場合は apm-config を編集し、そのうえで本リポジトリ側の `apm.yml` の pin と `apm.lock.yaml` を更新 (`apm update` 等) して反映します。

これらは [microsoft/apm](https://github.com/microsoft/apm) によって管理され、`apm compile` で Claude Code / Codex / GitHub Copilot 向けファイル (`CLAUDE.md` / `AGENTS.md` / `.claude/rules/` / `.github/instructions/`) に展開されます。
