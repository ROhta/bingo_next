terraform {
  required_version = "~> 1.11.0"

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
      name = "bingo_next_iac"
    }
  }
}
