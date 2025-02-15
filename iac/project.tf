resource "vercel_project" "bingo_next" {
  auto_assign_custom_domains                        = true
  automatically_expose_system_environment_variables = true
  customer_success_code_visibility                  = false
  directory_listing                                 = false
  framework                                         = "nextjs"
  function_failover                                 = false
  git_fork_protection                               = true
  git_lfs                                           = true
  git_repository = {
    production_branch = local.production_branch
    repo              = local.repo
    type              = "github"
  }
  name = "bingo-next"
  oidc_token_config = {
    enabled     = true
    issuer_mode = "team"
  }
  prioritise_production_builds = true
  resource_config              = {}
  serverless_function_region   = "hnd1"
  vercel_authentication = {
    deployment_type = "standard_protection"
  }
}

resource "vercel_project_domain" "bingo_next" {
  domain     = local.domain
  project_id = local.project_id
  team_id    = resource.vercel_team_config.bingo_next.id
}
