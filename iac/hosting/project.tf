resource "vercel_project" "bingo_next" {
  root_directory = "application/"
  framework      = "nextjs"
  name           = "bingo-next"

  git_repository = {
    production_branch = local.production_branch
    repo              = local.repo
    type              = "github"
  }

  oidc_token_config = {
    enabled     = true
    issuer_mode = "team"
  }

  vercel_authentication = {
    deployment_type = "standard_protection"
  }
}

resource "vercel_project_domain" "bingo_next" {
  domain     = local.domain
  project_id = local.project_id
  team_id    = resource.vercel_team_config.bingo_next.id
}
