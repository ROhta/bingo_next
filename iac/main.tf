terraform {
  required_version = "~> 1.11.0"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 2.10"
    }
    hcp = {
      source  = "hashicorp/hcp"
      version = "0.104.0"
    }
  }

  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "bingo_next"

    workspaces {
      name = "bingo_next_iac"
    }
  }
}

# data "hcp_vault_secrets_app" "bingo_next" {
#   app_name = "bingo-next"
# }
