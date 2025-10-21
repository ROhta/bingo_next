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

# Note: user_id is deprecated in Vercel Provider v3.17
# To add team members, use email attribute instead
# Example:
# resource "vercel_team_member" "bingo_next" {
#   projects = []
#   role     = "OWNER"
#   team_id  = resource.vercel_team_config.bingo_next.id
#   email    = "user@example.com"  # Specify the user's email address
# }
