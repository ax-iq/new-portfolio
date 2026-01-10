test-frontend:
	make --directory=new-frontend test

build-frontend:
	pnpm run --dir=new-frontend build

install-frontend-dependences:
	pnpm install --dir=new-frontend --dangerously-allow-all-builds
	pnpm --dir=new-frontend exec playwright install

compose-dev:
	docker compose -f compose.dev.yaml up --build --remove-orphans

deploy:
	docker compose -f compose.prod.yaml up -d --remove-orphans

deploy-frontend:
	docker compose -f compose.prod.yaml up -d frontend --remove-orphans

run-playbook:
	ansible-playbook -i infra/automation/ansible/inventory.yaml infra/automation/ansible/deploy-playbook.yaml

run-frontend:
	make --directory=new-frontend run

run-backend:
	make --directory=new-backend run

restart-dev: reset-dev start-dev

start-dev:
	docker compose -f compose.dev.yaml up --build -d --remove-orphans

clean:
	sudo rm -R ./infra/monitoring/fluent-bit/.tmp \
	; sudo rm -R ./infra/monitoring/loki/.tmp \
	; sudo rm -R ./infra/monitoring/otel-collector/.tmp \
	; sudo rm -R ./infra/monitoring/prometheus/.tmp

reset-prod:
	remove-containers-prod remove-volumes

reset-dev: remove-containers-dev remove-volumes

remove-containers-prod:
	docker compose -f compose.prod.yaml down

remove-containers-dev:
	docker compose -f compose.dev.yaml down

remove-volumes:
	docker volume rm grafana_storage
	docker volume rm loki_storage
	docker volume rm prometheus_storage
	docker volume rm tempo_storage
	docker volume rm traefik_storage

ansible-intall-docker:
	ansible-playbook infra/automation/ansible/playbook_install_docker.yaml -i infra/automation/ansible/inventory.yaml -u root --private-key=infra/automation/ansible/.tmp/local_container_key

ansible-deploy-dev:
	ansible-playbook infra/automation/ansible/playbook_deploy.yaml \
		-i infra/automation/ansible/inventory.yaml \
		-u root \
		--private-key=infra/automation/ansible/.tmp/local_container_key \
		--extra-vars \
		"api_url=http://backend:1337/api \
		backend_base_url=https://backend.localhost \
		system_version=0.1.0"

generate-env-vars: SCRIPT = infra/automation/scripts/generate-env-vars.sh
generate-env-vars:
	chmod +x ${SCRIPT} && ${SCRIPT} \
	
generate-ssh-keys: SCRIPT = infra/automation/scripts/generate-ssh-keys.sh
generate-ssh-keys:
	chmod +x ${SCRIPT} && ${SCRIPT} \

# generate-hashed-password:
# 	echo "username:hashed_password = $(htpasswd -nbB username password)"

sync-database-dev: LOCATION=/portfolio-system/new-backend/sqlite-prod-data
sync-database-dev:
	sudo mkdir -p  ${LOCATION} && \
		sudo cp -r ./new-backend/sqlite-prod-data/* ${LOCATION}

sync-config-dev: CONFIG_PATH=/portfolio-system/infra/monitoring
sync-config-dev:
	sudo mkdir -p  ${CONFIG_PATH} && \
		sudo cp -r ./infra/monitoring/* ${CONFIG_PATH}


# Use rsync
sync-database-prod: LOCATION=
sync-database-prod: