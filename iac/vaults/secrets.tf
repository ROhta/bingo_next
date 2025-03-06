data "hcp_vault_secrets_secret" "chromatic_project_token" {
  app_name    = "chromatic"
  secret_name = "chromatic_project_token"
}

output "chromatic_project_token" {
  value     = data.hcp_vault_secrets_secret.chromatic_project_token
  sensitive = true
}


data "hcp_vault_secrets_secret" "add_to_project" {
  app_name    = "GitHub-Projects"
  secret_name = "add_to_project"
}

output "add_to_project" {
  value     = data.hcp_vault_secrets_secret.add_to_project
  sensitive = true
}


data "hcp_vault_secrets_secret" "snyc" {
  app_name    = "GitHub-Scan"
  secret_name = "snyc"
}

output "snyc" {
  value     = data.hcp_vault_secrets_secret.snyc
  sensitive = true
}


data "hcp_vault_secrets_secret" "vault_radar" {
  app_name    = "GitHub-Scan"
  secret_name = "vault_radar"
}

output "vault_radar" {
  value     = data.hcp_vault_secrets_secret.vault_radar
  sensitive = true
}


data "hcp_vault_secrets_secret" "client_id" {
  app_name    = "hcp"
  secret_name = "client_id"
}

output "client_id" {
  value     = data.hcp_vault_secrets_secret.client_id
  sensitive = true
}


data "hcp_vault_secrets_secret" "client_secret" {
  app_name    = "hcp"
  secret_name = "client_secret"
}

output "client_secret" {
  value     = data.hcp_vault_secrets_secret.client_secret
  sensitive = true
}


data "hcp_vault_secrets_secret" "profile_summary_cards" {
  app_name    = "profile"
  secret_name = "profile_summary_cards"
}

output "profile_summary_cards" {
  value     = data.hcp_vault_secrets_secret.profile_summary_cards
  sensitive = true
}


data "hcp_vault_secrets_secret" "vercel_api_token" {
  app_name    = "vercel-token"
  secret_name = "vercel_api_token"
}

output "vercel_api_token" {
  value     = data.hcp_vault_secrets_secret.vercel_api_token
  sensitive = true
}
