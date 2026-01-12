variable "project" {}

variable "region" {
  default = "us-east1"
}

variable "zone" {
  default = "us-east1-c"
}

variable "ssh_user" {}
variable "ssh_public_key" {}
variable "bucket_name" {}

variable "disk_size" {
  default = 30
}

variable "vm_service_account_id" {
  default = "vm-sa-97532680"
}