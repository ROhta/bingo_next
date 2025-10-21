resource "vercel_team_config" "bingo_next" {
  id                                    = local.team_id
  name                                  = local.team_name
  slug                                  = local.team_name_slug
  description                           = local.team_name
  sensitive_environment_variable_policy = "on"
  remote_caching = {
    enabled = true
  }
  hide_ip_addresses               = true
  hide_ip_addresses_in_log_drains = true
}

resource "vercel_team_member" "bingo_next" {
  projects = []
  role     = "OWNER"
  team_id  = resource.vercel_team_config.bingo_next.id
  email    = local.user_email
}
