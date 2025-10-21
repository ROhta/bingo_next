# Note: vercel_deployment resource does not support terraform import
# Deployments are managed through Vercel UI and trigger automatically on git push
# Only use this resource if you need to trigger deployments programmatically
# resource "vercel_deployment" "bingo_next" {
#   production = true
#   project_id = resource.vercel_project.bingo_next.id
#   ref        = local.production_branch
# }
