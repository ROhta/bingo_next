# Note: vercel_deployment resource does not support terraform import
# Deployments must be managed through Vercel UI or API
# resource "vercel_deployment" "bingo_next" {
#   production = true
#   project_id = resource.vercel_project.bingo_next.id
#   ref        = local.production_branch
# }
