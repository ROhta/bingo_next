resource "hcp_vault_secrets_app" "bingo_next_project" {
  for_each = { for i in local.vault_list : i => i }

  app_name   = each.value
  project_id = local.project_id
}
