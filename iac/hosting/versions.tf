terraform {
  required_version = "~> 1.15"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 5.5"
    }
    time = {
      source  = "hashicorp/time"
      version = "~> 0.14"
    }
  }

  cloud {
    organization = "rohta"

    workspaces {
      name = "hosting"
    }
  }
}
