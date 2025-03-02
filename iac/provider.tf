provider "vercel" {
  api_token = data.hcp_vault_secrets_app.bingo_next.secrets["vercel_api_token"]
}

provider "hcp" {
  client_id     = var.hcp_client_id
  client_secret = var.hcp_client_secret
}
