output "project_id" {
  description = "ID of the managed Vercel project."
  value       = vercel_project.bingo_next.id
}

output "team_id" {
  description = "ID of the Vercel team that owns the project."
  value       = vercel_team_config.bingo_next.id
}

output "production_url" {
  description = "Production URL served by the assigned project domain."
  value       = "https://${vercel_project_domain.bingo_next.domain}"
}
