resource "vercel_team_config" "bingo_next" {
  id                                    = var.team_id
  name                                  = var.team_name
  slug                                  = var.team_name_slug
  description                           = var.team_description
  sensitive_environment_variable_policy = "on"
  remote_caching = {
    enabled = true
  }
  hide_ip_addresses               = true
  hide_ip_addresses_in_log_drains = true
  enable_preview_feedback         = "default"
  enable_production_feedback      = "default"
}
