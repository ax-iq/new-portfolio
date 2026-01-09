resource "google_service_account" "sa" {
  account_id   = "custom-sa"
  display_name = "Custom SA for VM Instance"
}

resource "google_project_iam_member" "storage_role" {
  project = var.project
  role    = "roles/storage.objectAdmin"
  member  = "serviceAccount:${google_service_account.sa.email}"
  depends_on = [google_service_account.sa]
}