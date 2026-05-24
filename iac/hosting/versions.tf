terraform {
  required_version = "~> 1.13"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 5.2"
    }
  }

  cloud {
    organization = "bingo_next"

    workspaces {
      name = "hosting"
    }
  }
}
