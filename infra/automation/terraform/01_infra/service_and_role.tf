resource "google_service_account" "vm_sa" {
  account_id   = var.vm_service_account_id
  display_name = "SA For VM Instance"
}

resource "google_project_iam_member" "storage_role" {
  project    = var.project
  role       = "roles/storage.objectAdmin"
  member     = "serviceAccount:${google_service_account.vm_sa.email}"
  depends_on = [google_service_account.vm_sa]
}