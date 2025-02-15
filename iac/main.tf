terraform {
  required_version = "~> 1.10.0"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 2.9"
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
