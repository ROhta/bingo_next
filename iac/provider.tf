provider "vercel" {
  api_token = var.vercel_api_token
}

provider "vault" {
  address = var.vault_address
  token   = var.vault_token
}
