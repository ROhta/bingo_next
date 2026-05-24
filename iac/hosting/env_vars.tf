resource "vercel_project_environment_variable" "enable_corepack" {
  project_id = vercel_project.bingo_next.id
  team_id    = vercel_team_config.bingo_next.id
  key        = "ENABLE_EXPERIMENTAL_COREPACK"
  value      = "1"
  target     = ["production", "preview"]
  sensitive  = true
}
