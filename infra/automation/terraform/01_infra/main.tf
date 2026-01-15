resource "google_compute_instance" "vm_instance" {
  name         = "ubuntu-vm-prod-98532680"
  machine_type = "e2-micro"
  zone         = var.zone

  tags = ["allow-ssh", "http-server", "https-server"]

  metadata = {
    "user-data" = templatefile("templates/user-data.yaml.tftpl", {
      ssh_user       = var.ssh_user,
      ssh_public_key = var.ssh_public_key
    })
  }

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2404-lts-amd64"
      size  = var.disk_size
      type  = "pd-standard"

      labels = {
        my_label = "ubuntu-2404-lts-amd64"
      }
    }
  }

  network_interface {
    network = google_compute_network.vpc_network.id
    subnetwork = google_compute_subnetwork.subnet_main.id
    access_config {}
  }

  service_account {
    email  = google_service_account.vm_sa.email
    scopes = ["cloud-platform"]
  }
}