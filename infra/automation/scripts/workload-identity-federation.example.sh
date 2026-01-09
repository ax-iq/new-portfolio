# RUN DIRECTLY ON GOOGLE CLOUD SHELL
# This script is idempotent meaning that
# it will skip resources creation if they
# already exist.

# !!!!! Replace the variable names to match the GCP account
BILLING_ACCOUNT_ID=billing-id
USER_ID=example@gmail.com
ORGANIZATION_ID=486132746562

FOLDER_NAME=portfolio
PROJECT_ID=portfolio-prod-12301155
GITHUB_ORG=ax-iq
REPO=ax-iq/new-portfolio
POOL_ID=github
PROVIDER_ID=my-repo


# Give permission to create folders
gcloud organizations add-iam-policy-binding ${ORGANIZATION_ID} \
  --member=user:${USER_ID} \
  --role=roles/resourcemanager.folderAdmin

# Give permission to manage workload identity pools
gcloud organizations add-iam-policy-binding ${ORGANIZATION_ID} \
  --member=user:${USER_ID} \
  --role=roles/iam.workloadIdentityPoolAdmin

# Try to find the folder by name
FOLDER_ID=$(gcloud resource-manager folders list \
  --organization="${ORGANIZATION_ID}" \
  --filter="displayName=${FOLDER_NAME}" \
  --format="value(name)")

# Create folder if it doesn't exist
if [ -z "${FOLDER_ID}" ]; then
  echo "Folder not found. Creating..."
  FOLDER_ID=$(gcloud resource-manager folders create \
      --display-name="${FOLDER_NAME}" \
      --organization="${ORGANIZATION_ID}" \
      --format="value(name)")
else
  echo "Folder ${FOLDER_ID} already exists."
fi

# Create a Project
if gcloud projects describe "${PROJECT_ID}" &> /dev/null; then
  echo "Project ${PROJECT_ID} already exists."
else
    echo "Creating Project..."
    gcloud projects create ${PROJECT_ID} \
      --folder=${FOLDER_ID}
    gcloud billing projects link ${PROJECT_ID} --billing-account=${BILLING_ACCOUNT_ID}
fi

# Create a Workload Identity Pool
if gcloud iam workload-identity-pools describe "${POOL_ID}" \
    --project="${PROJECT_ID}" \
    --location="global" \
    &> /dev/null; then
  echo "Workload identity pool '${POOL_ID}' already exists."
else
    gcloud iam workload-identity-pools create "${POOL_ID}" \
    --project="${PROJECT_ID}" \
    --location="global" \
    --display-name="GitHub Actions Pool"
fi

# Get the full ID of the Workload Identity Pool
WORKLOAD_IDENTITY_POOL_ID=$(gcloud iam workload-identity-pools describe "${POOL_ID}" \
                            --project="${PROJECT_ID}" \
                            --location="global" \
                            --format="value(name)")

# Create a Workload Identity Provider in that pool
if gcloud iam workload-identity-pools providers describe "${PROVIDER_ID}" \
  --workload-identity-pool="${POOL_ID}" \
  --location="global" \
  --project="${PROJECT_ID}" &> /dev/null; then
  echo "Provider '${PROVIDER_ID}' already exists."
else
    gcloud iam workload-identity-pools providers create-oidc "${PROVIDER_ID}" \
    --project="${PROJECT_ID}" \
    --location="global" \
    --workload-identity-pool="${POOL_ID}" \
    --display-name="My GitHub repo Provider" \
    --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" \
    --attribute-condition="assertion.repository_owner == '${GITHUB_ORG}'" \
    --issuer-uri="https://token.actions.githubusercontent.com"
fi

# Extract the Workload Identity Provider resource name
WORKLOAD_IDENTITY_PROVIDER=$(gcloud iam workload-identity-pools providers describe "my-repo" \
                            --project="${PROJECT_ID}" \
                            --location="global" \
                            --workload-identity-pool=${POOL_ID} \
                            --format="value(name)")

# Bind roles
# gcloud secrets add-iam-policy-binding "my-secret" \
#   --project="${PROJECT_ID}" \
#   --role="roles/secretmanager.secretAccessor" \
#   --member="principalSet://iam.googleapis.com/${WORKLOAD_IDENTITY_POOL_ID}/attribute.repository/${REPO}"

gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --role="roles/compute.admin" \
  --member="principalSet://iam.googleapis.com/${WORKLOAD_IDENTITY_POOL_ID}/attribute.repository/${REPO}"

gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --role="roles/storage.admin" \
  --member="principalSet://iam.googleapis.com/${WORKLOAD_IDENTITY_POOL_ID}/attribute.repository/${REPO}"

gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --role="roles/secretmanager.secretAccessor" \
  --member="principalSet://iam.googleapis.com/${WORKLOAD_IDENTITY_POOL_ID}/attribute.repository/${REPO}"

gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --role="roles/iam.serviceAccountUser" \
  --member="principalSet://iam.googleapis.com/${WORKLOAD_IDENTITY_POOL_ID}/attribute.repository/${REPO}"

echo "GCP_WORKLOAD_IDENTITY_PROVIDER=${WORKLOAD_IDENTITY_PROVIDER}"
echo "GCP_PROJECT_ID=${PROJECT_ID}"

# Setup terraform backend with Cloud Storage (already done in automated workflow)
# gcloud projects add-iam-policy-binding ${PROJECT_ID} \
#   --role="roles/storage.admin" \
#   --member="user:${USER_ID}"

# *************************************************************************** #

# *************************************************************************** #