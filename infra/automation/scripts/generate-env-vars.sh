#!/bin/sh
# Generates Strapi backend environment variables

echo "JWT_SECRET = $(openssl rand -base64 32)"
echo "APP_KEYS = $(openssl rand -base64 32),$(openssl rand -base64 32)"
echo "ADMIN_JWT_SECRET = $(openssl rand -base64 32)"
echo "ENCRYPTION_KEY = $(openssl rand -base64 32)"
echo "API_TOKEN_SALT = $(openssl rand -base64 32)"
echo "TRANSFER_TOKEN_SALT = $(openssl rand -base64 32)"