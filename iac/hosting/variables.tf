variable "vercel_api_token" {
  description = "Vercel API token. Provided via Terraform Cloud workspace variables."
  type        = string
  sensitive   = true
}

variable "team_id" {
  description = "Vercel team ID for the existing team config. Used as the import identifier."
  type        = string
  default     = "team_YR2EVOhud8379Uz429mo0SDG"
}

variable "team_name" {
  description = "Display name of the Vercel team."
  type        = string
  default     = "rohta's projects"
}

variable "team_name_slug" {
  description = "URL slug of the Vercel team."
  type        = string
  default     = "rohtas-projects"
}

variable "repo" {
  description = "GitHub repository connected to the Vercel project (owner/name)."
  type        = string
  default     = "ROhta/bingo_next"
}

variable "production_branch" {
  description = "Git branch that deploys to production."
  type        = string
  default     = "main"
}

variable "domain" {
  description = "Primary domain assigned to the Vercel project."
  type        = string
  default     = "rohta-bingo-next.vercel.app"
}
