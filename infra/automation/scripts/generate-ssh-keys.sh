#!/bin/sh
# Generates SSH Keys

ssh-keygen -t rsa -b 4096 -C "github-actions" -N "" -f github_actions_key -q

echo "SSH_PUBLIC_KEY = \n$(cat github_actions_key.pub) \n"
echo "SSH_PRIVATE_KEY = \n$(cat github_actions_key)"

rm github_actions_key github_actions_key.pub