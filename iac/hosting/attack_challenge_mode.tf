resource "vercel_attack_challenge_mode" "bingo_next" {
  project_id = vercel_project.bingo_next.id
  enabled    = true
  team_id    = vercel_team_config.bingo_next.id
}
