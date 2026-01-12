resource "google_compute_network" "vpc_network" {
  name = "vpc-network"
}

resource "google_compute_firewall" "default" {
  name    = "http-access"
  network = google_compute_network.vpc_network.name
  allow {
    protocol = "tcp"
    ports    = ["80"]
  }
  target_tags   = ["http"]
  source_ranges = ["0.0.0.0/0"]
}

resource "google_compute_firewall" "https" {
  name    = "https-access"
  network = "default"
  allow {
    protocol = "tcp"
    ports    = ["443"]
  }
  target_tags   = ["https"]
  source_ranges = ["0.0.0.0/0"]
}

resource "google_compute_firewall" "ssh" {
  name    = "ssh"
  network = google_compute_network.vpc_network.name
  allow {
    protocol = "tcp"
    ports    = ["22"]
  }
  target_tags   = ["ssh"]
  source_ranges = ["0.0.0.0/0"]
}
