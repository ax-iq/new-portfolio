output "public_ip" {
  value = google_compute_instance.vm_instance.network_interface.0.network_ip
}

output "sa_email" {
  value = google_service_account.vm_sa.email
}
