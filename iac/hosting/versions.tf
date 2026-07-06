terraform {
  required_version = "~> 1.13"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 5.2"
    }
    time = {
      source  = "hashicorp/time"
      version = "~> 0.13"
    }
  }

  cloud {
    organization = "rohta"

    workspaces {
      name = "hosting"
    }
  }
}
