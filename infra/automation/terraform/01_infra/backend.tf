# Configure a remote backend like S3 to persist state
terraform {
  backend "gcs" {
    bucket = var.bucket_name
    prefix = "infra/state"
  }
}
