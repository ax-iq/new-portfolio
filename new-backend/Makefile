NODE_VERSION=20
# BASH_ENV := /etc/bash.bashrc
# export BASH_ENV
# SHELL := /bin/bash   

run: 
	. "$$NVM_DIR/nvm.sh" && nvm use $(NODE_VERSION) && \
	pnpm run dev

disable-data-collection:
	pnpm run strapi telemetry:disable

list-middlewares:
	pnpm strapi middlewares:list

create-middleware:
	pnpm strapi generate	

pre-commit:
	echo "No pre-commit yet"