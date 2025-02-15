resource "vercel_deployment" "bingo_next" {
  production = true
  project_id = resource.vercel_project.bingo_next.id
  ref        = local.production_branch
}
