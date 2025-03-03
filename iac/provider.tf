provider "vercel" {
  api_token = var.vercel_api_token
}

provider "hcp" {
  client_id     = var.HCP_CLIENT_ID
  client_secret = var.HCP_CLIENT_SECRET
}
