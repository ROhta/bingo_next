terraform {
  required_version = "~> 1.13"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 3.17"
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
