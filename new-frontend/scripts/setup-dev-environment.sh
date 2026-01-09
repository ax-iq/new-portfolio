#!/bin/bash

# Install PNPM
curl -fsSL https://get.pnpm.io/install.sh | sh -
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# Install Node.js
nvm install 23.7.0
# Set default node version
nvm alias default v23.7.0