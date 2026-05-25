# Vercel API は attack_mode_active_until を「now + 24h 以内」に制限している。
# 恒久的に enabled = true を保ちたいので、time_offset で初回 apply 時に now+23h を計算し、
# lifecycle.ignore_changes で以降の plan 差分を抑止する。 23h 経過すると Vercel 側で mode
# 自体は期限切れになるが enabled フラグは state 上維持される。完全な常時 ON を要求する
# 場合は cron 等で TF apply を回す必要がある (現状は許容範囲としてこの構成で運用)。
resource "time_offset" "attack_mode_active_until" {
  offset_hours = 23
}

resource "vercel_attack_challenge_mode" "bingo_next" {
  project_id               = vercel_project.bingo_next.id
  team_id                  = vercel_team_config.bingo_next.id
  enabled                  = true
  attack_mode_active_until = time_offset.attack_mode_active_until.unix * 1000

  lifecycle {
    ignore_changes = [attack_mode_active_until]
  }
}
