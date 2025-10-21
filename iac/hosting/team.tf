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

# Note: vercel_team_member requires additional API permissions
# This resource is commented out due to API authorization limitations
# Uncomment and update with appropriate credentials if needed
# resource "vercel_team_member" "bingo_next" {
#   projects = []
#   role     = "OWNER"
#   team_id  = resource.vercel_team_config.bingo_next.id
#   email    = local.user_email
# }
