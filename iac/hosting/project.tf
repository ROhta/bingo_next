# Web Analytics / Speed Insights は @vercel/analytics と @vercel/speed-insights の SDK で
# application/src/app/layout.tsx に組み込み済み。Vercel provider 5.3.x には対応する project
# 属性が無いため、トグル状態は IaC で固定できない (Hobby plan は Vercel 側で自動有効)。
resource "vercel_project" "bingo_next" {
  root_directory = "application/"
  framework      = "nextjs"
  name           = "bingo-next"
  node_version   = "24.x"

  git_repository = {
    production_branch = local.production_branch
    repo              = local.repo
    type              = "github"
  }

  oidc_token_config = {
    issuer_mode = "team"
  }

  vercel_authentication = {
    deployment_type = "standard_protection"
  }

  auto_assign_custom_domains                        = true
  automatically_expose_system_environment_variables = false
  customer_success_code_visibility                  = false
  directory_listing                                 = false
  enable_affected_projects_deployments              = false
  enable_preview_feedback                           = true
  enable_production_feedback                        = true
  function_failover                                 = true
  git_fork_protection                               = true
  git_lfs                                           = false
  preview_deployments_disabled                      = false
  prioritise_production_builds                      = false
  public_source                                     = false
}

resource "vercel_project_domain" "bingo_next" {
  domain     = local.domain
  project_id = local.project_id
  team_id    = resource.vercel_team_config.bingo_next.id
}
