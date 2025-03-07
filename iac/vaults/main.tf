terraform {
  required_version = "~> 1.11"

  required_providers {
    hcp = {
      source  = "hashicorp/hcp"
      version = "~> 0.104.0"
    }
  }

  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "bingo_next"

    workspaces {
      name = "vaults"
    }
  }
}


provider "hcp" {
  client_id     = var.client_id
  client_secret = var.client_secret
}

variable "client_id" {
  description = "from Service Principals"
  type        = string
}

variable "client_secret" {
  description = "from Service Principals"
  type        = string
}
