resource "hcp_vault_secrets_app" "bingo_next_project" {
  for_each = { for i in local.vault_list : i => i }

  app_name   = each.value
  project_id = local.project_id
}

locals {
  project_id = "54ecb58d-35f2-4a71-9152-79b82af95578"
  vault_list = [
    "chromatic",
    "GitHub-Projects",
    "GitHub-Scan",
    "hcp",
    "profile",
    "vercel-token"
  ]
}
