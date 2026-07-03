---
description: ローカル開発時のフロー (実装完了から PR 作成、PR レビュー応答ループ) を superpowers 系スキルで定義
applyTo: "**"
---

# ローカル開発ワークフロー (AI エージェント向け)

このプロジェクトでローカル開発を進める AI エージェントは、以下のワークフローに従う。

## 前提: superpowers の存在確認

本ワークフローは [superpowers](https://github.com/anthropics/superpowers) 系スキル
(`verification-before-completion` / `requesting-code-review` / `receiving-code-review`
/ `finishing-a-development-branch`) が利用可能であることを前提とする。

- **Claude Code**: 上記 4 つのスキルが `Skill` ツールから呼び出せることを起動時に確認する
- **Codex CLI / GitHub Copilot 等**: 同等のスキル集が読み込まれているかを確認する

利用できない場合は、ユーザーに次のように案内し、本ワークフローの実行をその場で中断する。

> superpowers が見つかりません。
> 当プロジェクトのローカル開発フローを実行するには superpowers のインストールが必要です。
> インストール後に再度同じ指示をお願いします。

## 1. 実装完了から PR 作成まで

実装が完了したと判断した時点で、以下を順に実行する。**前ステップが完了するまで次に進まない。**

1. `verification-before-completion` を起動し、検証 (lint / typecheck / 実機動作) を完遂する
2. 検証が通ったら `requesting-code-review` を起動し、レビュー依頼側ワークフローを開始する
3. レビュー結果が返ってきたら `receiving-code-review` を起動してフィードバックに対応する
4. 対応が完了したら `finishing-a-development-branch` を起動し、選択肢「2」を選んで PR を作成する
   - PR 本文は `.github/PULL_REQUEST_TEMPLATE.md` の項目 (`## 期待する挙動・状態` / `## 確認済み項目` / `## 見てほしいところ`) を埋める形で記載すること。`finishing-a-development-branch` スキルが提案する独自構成 (`## Summary` / `## Test plan` 等) は採用しない
   - チェックボックスは commit 前に実際に検証済みの項目のみ `[x]`、Preview Deploy 待ちなど未確認のものは `[ ]` のまま残す
   - PR タイトルは Conventional Commits 形式 (`<type>(<scope>): <description>`) で記載し、本文と同じく日本語で書く
   - PR の assignee には、コミットを作成した人間のユーザー (= 現在の `gh` CLI 認証ユーザー) を必ず設定する。AI エージェントは GitHub アカウントを持たないため、`gh pr create` 時に `--assignee @me` を渡すか、作成後に `gh pr edit <pr_number> --add-assignee @me` で追加する。`@me` は `gh` CLI が現在認証中のユーザー名に解決される

各ステップで失敗した場合は次に進まず、失敗の根本原因を解決してから再実行する。

## 2. PR レビュー応答ループ (PR 作成 / push 毎)

PR を新規作成、または既存ブランチに push した後、AI エージェントは **ユーザーからの
「レビュー指摘がきた」等の合図を待たずに** 自走でレビュースレッドの有無を確認し、
指摘があれば対応ループを実行する。**すべてのスレッドが resolve されるまでループを
継続する。**

### 2.0 自走チェックの起動方法

`gh pr create` または `git push` が成功した直後、本セクションのフローを開始する。
**ユーザー入力を待たない。**

#### 2.0.1 即時 1 回チェック (全エージェント共通)

push 完了から **2 分 (120 秒) 待機** (Copilot Review の初回反応待ち) し、§2.1 のクエリを
1 回実行する。未 resolve スレッドがあれば §2.2〜2.3 で処理する。

#### 2.0.2 追跡チェックの予約 (エージェント別)

Copilot Review の指摘は遅延することがあるため、即時チェックで未指摘でも以下の方法で
**さらに 2 分後** に 1 回フォローする。
**§2.0.1 と §2.0.2 を合わせて連続 2 回** 未指摘なら追跡を終了する。

##### Claude Code 実行時

`ScheduleWakeup` ツールで自走する。`delaySeconds` は [60, 3600] の範囲。

```text
ScheduleWakeup({
  delaySeconds: 120,
  prompt: "PR #<number> の Copilot Review 応答ループを再開する。.apm/instructions/local-dev-workflow.instructions.md §2 に従い、未 resolve スレッドを検知して処理せよ。",
  reason: "Copilot Review 遅延応答の追跡チェック (push から 2 分後)"
})
```

再起動ターンで §2.1 を実行する。

- 未 resolve があれば §2.2〜2.3 で処理し、修正コミットを push 後、改めて §2.0.1 から
  新サイクルを開始する
- **連続 2 回** (§2.0.1 + §2.0.2) 新規指摘がなければ追跡終了

##### Codex CLI 実行時

Codex CLI には自己再起動予約機能がない (`codex exec` は単発実行、TUI は対話セッション
内のみ動作)。代替として以下のいずれかを採用する。

- **Codex app の Automations**: UI または cron syntax で
  `codex exec "PR #<pr_number> の Copilot Review 応答ループを実行"` を 2 分間隔で 2 回
  の recurring task として登録するようユーザーに案内する
  (参考: <https://developers.openai.com/codex/app/automations>)
- **ローカル shell**: 開発機で
  `for i in 1 2; do sleep 120; codex exec "PR #<pr_number> の Copilot Review 応答ループを実行"; done &`
  を起動するようユーザーに案内する

ユーザーがいずれも採用しない場合は §2.0.3 のフォールバックに委ねる。

##### GitHub Copilot CLI / Coding Agent 実行時

Copilot Coding Agent はクラウド側で動作し、自己再起動予約機能はない。代替手段:

- **GitHub Actions の `on.schedule.cron`**: Agentic Workflows (`gh aw`) または
  `gh copilot` を 2 分間隔の cron で呼び出す workflow (例:
  `.github/workflows/pr-review-tracker.yml`) を提案する
  (参考: <https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/automate-with-actions>、
  <https://github.github.com/gh-aw/>)
- 既存 workflow がある場合は再利用、無い場合はユーザーに作成可否を確認する

ユーザーが採用しない場合は §2.0.3 のフォールバックに委ねる。

#### 2.0.3 ユーザー復帰時フォールバック (全エージェント共通)

ユーザーから次の入力を受け取ったとき、その入力が PR と無関係に見えても、まず自分が
作成した未マージ PR について `gh api graphql` で未 resolve スレッドの有無を 1 回確認
する。

- 未 resolve あり → ユーザーに「PR #<pr_number> に未対応のレビュースレッドがあります。
  先に応答しますか？」と確認し、了承されたら §2.1〜2.3 を先に実行
- 未 resolve なし、または PR が merged / closed → 通常通り本来の入力に着手

このフォールバックは **自己再起動できないエージェント (Codex / Copilot) の取りこぼし
防止** と、自走チェック (合計 4 分) 終了後に来た遅延指摘を拾う最後の砦として機能する。

#### 2.0.4 運用上の注意 (PR #683 dogfooding で得られた知見)

- **§2.0.1 即時チェックが最重要**: Copilot Review の指摘は push 完了から数十秒〜2 分
  以内に大半が出る傾向がある。§2.0.1 で捕捉できる確率が高く、§2.0.2 追跡チェックは
  遅延応答に対する保険的位置付けと捉えてよい。
- **`ScheduleWakeup` は上書きされない**: Claude Code で `ScheduleWakeup` を再 call
  しても、前回予約は **キャンセルされず別ターンとして独立起動する**。サイクル変更
  (規範更新や push の重ね打ち) を行うと、旧 prompt に従う古いターンが起動する可能性が
  ある。許容するか、prompt 内に「現在の最新 push SHA を取得し、自分が前提とする SHA と
  異なれば no-op で終了」判定を入れる。
- **サイクルは push 単位、ただし PR 全体共通**: 同一 PR で push を重ねるごとに新サイクル
  を立ち上げる設計は、Copilot Review が PR 全体に対してレビューする実態と整合させると
  二重チェックになりうる。新 push に対するサイクルを開始する前に、進行中の旧サイクル
  が残っていれば 1 つのチェック共有でもよい (`gh api graphql` の結果は PR 単位なので
  同じ未 resolve リストが返る)。

### 2.1 検知

`gh api graphql` で未 resolve なレビュースレッドを列挙する。
`gh pr view --json reviews,comments` は thread の `isResolved` を返さないので利用しない。

レビュースレッド数が 100 を超える可能性がある場合は、`reviewThreads.pageInfo` の
`hasNextPage` / `endCursor` を取得し、`hasNextPage: true` の間は `$threadsCursor` に
`endCursor` を渡してカーソル送りで全件取得すること (下記は初回ページの取得例)。

各スレッドのコメントは、本クエリでは `comments(first: 50)` までに限定する前提とする
(`$commentsCursor` は単一値しか持てず、全スレッドのコメントに対して同じカーソルを
当てるため、スレッドごとに個別のページングはこのクエリでは行えないため)。1 スレッドの
コメントが 50 件を超えた場合は、当該スレッド ID を指定して別途取得する。

```bash
gh api graphql -f query='
query($owner: String!, $repo: String!, $pr: Int!, $threadsCursor: String) {
  repository(owner: $owner, name: $repo) {
    pullRequest(number: $pr) {
      reviewThreads(first: 100, after: $threadsCursor) {
        pageInfo { hasNextPage endCursor }
        nodes {
          id            # GraphQL Node ID — resolveReviewThread mutation の threadId に渡す
          isResolved
          comments(first: 50) {
            pageInfo { hasNextPage endCursor }
            nodes {
              id          # GraphQL Node ID
              databaseId  # 数値 ID — REST API POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies の comment_id に渡す
              author { login }
              body
              path
              line
            }
          }
        }
      }
    }
  }
}' -F owner=<owner> -F repo=<repo> -F pr=<number>
```

対象は `isResolved: false` かつ **スレッド先頭コメント (`comments.nodes[0]`) の `author.login`**
が bot (例: `copilot-pull-request-reviewer`) のスレッドのみとする
(`reviewThreads.nodes[]` 自体には `author` フィールドが存在しないので、コメント側で
判定する必要がある)。

### 2.2 妥当性判断

各指摘について次のいずれかに分類する。

- **妥当**: 反映すべき具体的かつ正当な指摘
- **不当**: 文脈を踏まえると採用すべきでない、誤読、二重指摘 等

### 2.3 対応

#### 妥当な指摘

1. 指摘に従ってコードを修正する
2. 修正をコミットする (このリポジトリでは Co-Authored-By トレーラは付与しない)
3. 該当インラインコメントに返信する。本文に対応コミットの SHA を **前後に半角空白を入れて**
   記載し、GitHub UI でコミットへのリンクとして描画させる。

   ```bash
   gh api repos/<owner>/<repo>/pulls/<pr>/comments/<comment_database_id>/replies \
     -f body='対応しました abc1234 '
   ```

   - `<comment_database_id>` は上記クエリの `databaseId` フィールド (**数値 ID**) を指す。
     GraphQL Node ID (`PRRC_...`) は REST API では受け付けられない点に注意。
   - 本文は日本語で記述 (`pr-review.instructions.md` 参照)
   - SHA の前後を必ず半角空白で挟む
4. スレッドを resolve する。

   ```bash
   gh api graphql -f query='
   mutation($id: ID!) { resolveReviewThread(input: {threadId: $id}) { thread { isResolved } } }
   ' -F id=<thread_node_id>
   ```

#### 不当と判断した場合

1. コードは変更しない
2. インラインコメントで「不当と判断した理由」を日本語で具体的に記載する
3. スレッドを resolve する (上記 mutation 参照)

### 2.4 繰り返し

- 全スレッドを resolve するまで 2.1〜2.3 をループする
- 次の `git push` が発生したら、再度 2.1 から実行する

## 関連ルール

- レビュー応答の文章ルールは共通パッケージ `ROhta/apm-config/base`（`pr-review.instructions.md`）から配信。生成物は `.github/instructions/pr-review.instructions.md` / `.claude/rules/pr-review.md`
