variable "vercel_api_token" {
  description = "Vercel API token. Provided via Terraform Cloud workspace variables."
  type        = string
  sensitive   = true
}

variable "team_id" {
  description = "Vercel team ID this workspace manages. 既存 team を import 済みのため変更には state からの再 import が必要。"
  type        = string
  default     = "team_YR2EVOhud8379Uz429mo0SDG"
}

variable "team_name" {
  description = "Display name of the Vercel team. 既存 team の表示名と一致させる必要あり。"
  type        = string
  default     = "rohta's projects"
}

variable "team_name_slug" {
  description = "URL slug of the Vercel team. Vercel 側で確定済みのため通常は変更しない。"
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
