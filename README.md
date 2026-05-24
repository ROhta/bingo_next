# bingo_next

v0 と Terraform Cloud を使った bingo の Next.js 再実装。

## 概要

- アプリケーションは Next.js (アプリケーションコードは v0 で作成)
- ホスティングと監視は Vercel
- IaC は Terraform により構築

## ドキュメント

プロジェクトに関するすべてのドキュメント (環境構築・PR レビュー方針・APM 運用ルール) は AI エージェント向け指示と共通化しており、[`.apm/instructions/`](./.apm/instructions/) 配下に集約されています。

| ファイル                                                                       | 内容                                                                                                  |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| [`setup`](./.apm/instructions/setup.instructions.md)                           | 必要アカウント・ローカル環境構築手順 (application / iac)                                              |
| [`pr-review`](./.apm/instructions/pr-review.instructions.md)                   | PR レビュー時のコミュニケーション方針                                                                 |
| [`apm-workflow`](./.apm/instructions/apm-workflow.instructions.md)             | APM の運用ルール (`.apm/instructions/` 編集後に `apm install` / `apm compile` を実行する必要あり)     |

これらは [microsoft/apm](https://github.com/microsoft/apm) によって管理され、`apm compile` で Claude Code / Codex / GitHub Copilot 向けファイル (`CLAUDE.md` / `AGENTS.md` / `.claude/rules/` / `.github/instructions/`) に展開されます。
