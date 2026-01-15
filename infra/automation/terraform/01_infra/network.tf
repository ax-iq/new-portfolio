resource "google_compute_network" "vpc_network" {
  name                    = "vpc-network-prod-97532680"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "subnet_main" {
  name          = "subnet-main"
  ip_cidr_range = "10.10.1.0/24"
  region        = var.region
  network       = google_compute_network.vpc_network.id
}

resource "google_compute_firewall" "http" {
  name    = "http-access"
  network = google_compute_network.vpc_network.name
  allow {
    protocol = "tcp"
    ports    = ["80"]
  }
  target_tags   = ["http-server"]
  source_ranges = ["0.0.0.0/0"]
}

resource "google_compute_firewall" "https" {
  name    = "https-access"
  network = google_compute_network.vpc_network.name
  allow {
    protocol = "tcp"
    ports    = ["443"]
  }
  target_tags   = ["https-server"]
  source_ranges = ["0.0.0.0/0"]
}

resource "google_compute_firewall" "ssh" {
  name    = "ssh-access"
  network = google_compute_network.vpc_network.name
  allow {
    protocol = "tcp"
    ports    = ["22"]
  }
  target_tags   = ["allow-ssh"]
  source_ranges = ["0.0.0.0/0"]
}
