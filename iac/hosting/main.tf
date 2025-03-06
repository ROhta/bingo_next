terraform {
  required_version = "~> 1.11"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 2.10"
    }
  }

  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "bingo_next"

    workspaces {
      name = "hosting"
    }
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
}

variable "vercel_api_token" {
  description = "API token for Vercel"
  type        = string
}
