resource "google_compute_instance" "vm_instance" {
  name         = "ubuntu-vm-instance"
  machine_type = "e2-micro"
  zone         = var.zone

  tags = ["ssh", "http", "https"]

  metadata = {
    "user_data" = templatefile("templates/user-data.yaml.tftpl", {
      ssh_user       = var.ssh_user,
      ssh_public_key = var.ssh_public_key
    })
  }

  boot_disk {
    source = google_compute_image.ubuntu_with_disk.self_link
  }

  network_interface {
    network = google_compute_network.vpc_network.name
    access_config {
    }
  }

  service_account {
    email  = google_service_account.vm_sa.email
    scopes = ["cloud-platform"]
  }
}