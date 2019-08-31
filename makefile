#!make
include .env

install:
	@echo "\n[ installing api dependencies ]"
	@docker-compose run --rm api npm install
	@echo "\n"

rm:
	@echo "\n[ stopping and removing docker containers ]"
	@docker stop `docker ps -a -q`
	@docker rm `docker ps -a -q`
	@echo "\n"

rmi:
	@echo "\n[ removing docker images ]"
	docker rmi `docker images -a -q`
	@echo "\n"

audit: 
	@echo "\n[ auditing api dependencies ]"
	@docker-compose run --rm api npm audit
	@echo "\n"
		
audit-fix:
	@echo "\n[ fixing api dependencies ]"
	@docker-compose run --rm api npm audit fix
	@echo "\n"

run: 
	@echo "\n[ executing $(cmd) in api container ]"
	docker-compose run --rm api $(cmd)

exec: 
	@echo "\n[ executing $(cmd) in api container ]"
	docker-compose exec api $(cmd)

api:
	@echo "\n[ starting up api ]"
	@docker-compose up --build api
	@echo "\n"
.PHONY: api

api-d:
	@echo "\n[ tearing down api ]"
	@docker-compose down
	@echo "\n"

test: 
	docker build --target test --file="./client/Dockerfile" \
		--tag devpies/client-api:test ./client

build: 
	@echo "\n[ build api production image ]"
	docker build --target prod --file="./api/Dockerfile" \
	--build-arg backend=${REACT_APP_BACKEND} \
	--build-arg frontend=${REACT_APP_FRONTEND} \
	--build-arg api_namespace=${API_NAMESPACE} \
	--tag devpies/client-api:prod ./api

login: 
	@echo "\n[ log into private registry ]"
	cat ./secrets/registry_pass | docker login --username `cat ./secrets/registry_user` --password-stdin

publish:
	@echo "\n[ publish production grade images ]"
	docker push devpies/client-api:prod

deploy:	login
	@echo "\n[ startup production stack ]"
	@cat ./startup
	@docker stack deploy -c docker-stack.yml --with-registry-auth client-api
	@echo "\n"
