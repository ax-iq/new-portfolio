data "google_compute_image" "ubuntu" {
  family  = "ubuntu-2404-lts-amd64"
  project = "ubuntu-os-cloud"
}

resource "google_compute_disk" "persistent" {
  name  = "vm-disk"
  image = data.google_compute_image.ubuntu.self_link
  size  = var.disk_size
  type  = "pd-standard"
  zone  = var.zone
}

resource "google_compute_image" "ubuntu_with_disk" {
  name = "ubuntu-with-disk-image"
  source_disk = google_compute_disk.persistent.id
  storage_locations = [var.region]
}