locals {
  team_id           = "team_YR2EVOhud8379Uz429mo0SDG"
  project_id        = "prj_MElDKOgU2mzfBMDQyTzckES8SeyE"
  user_email        = "utbc.ohta@gmail.com"
  repo              = "ROhta/bingo_next"
  domain            = "rohta-bingo-next.vercel.app"
  team_name         = "rohta's projects"
  team_name_slug    = "rohtas-projects"
  production_branch = "main"

  # Unix ms timestamp at which Vercel will auto-disable Attack Challenge Mode.
  # Required by vercel provider v5; set to 2100-01-01 UTC so the mode stays on indefinitely.
  attack_mode_active_until_ms = 4102444800000
}
