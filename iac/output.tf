output "secrets" {
  value     = data.hcp_vault_secrets_app.bingo_next.secrets
  sensitive = true
}
