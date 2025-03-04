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
      name = "bingo_next_setting"
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




resource "hcp_vault_secrets_app" "bingo_next_deploy" {
  app_name   = "chromatic"
  project_id = "54ecb58d-35f2-4a71-9152-79b82af95578"
}

