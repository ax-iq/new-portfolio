# Configure a remote backend like S3 to persist state
terraform {
  backend "gcs" {
    prefix = "infra/state"
  }
}
