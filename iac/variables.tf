variable "vercel_api_token" {
  description = "API token for Vercel"
  type        = string
}

variable "HCP_CLIENT_ID" {
  description = "HCP Client ID"
  type        = string
  default     = ""
}

variable "HCP_CLIENT_SECRET" {
  description = "HCP Client Secret"
  type        = string
  default     = ""
}
