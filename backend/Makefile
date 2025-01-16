POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=portfolio
POSTGRES_HOST=localhost
POSTGRES_PORT=5433

DB_URL=postgres://$(POSTGRES_USER):$(POSTGRES_PASSWORD)@$(POSTGRES_HOST):$(POSTGRES_PORT)/$(POSTGRES_DB)?sslmode=disable

.PHONY: all build run test clean setup sqlc migrate-up migrate-down

setup: install-deps install-tools create-env docker-up wait-for-db migrate-up sqlc
	@echo "setup complete!"

install-deps:
	go mod download
	go mod tidy

install-tools:
	go install github.com/pressly/goose/v3/cmd/goose@latest
	go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
	go install github.com/air-verse/air@latest

wait-for-db:
	@echo "Waiting for database to be ready..."
	@for i in `seq 1 30`; do \
		if psql "$(DB_URL)" -c '\q' >/dev/null 2>&1; then \
			echo "Database is ready!"; \
			exit 0; \
		fi; \
		echo "Waiting..."; \
		sleep 1; \
	done; \
	echo "Database is not ready after 30 seconds"; \
	exit 1

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

docker-logs:
	docker-compose logs -f

psql:
	docker exec -it portfolio-db psql -U $(POSTGRES_USER) -d $(POSTGRES_DB)

migrate-up:
	goose -dir .sqlc/migrations postgres "$(DB_URL)" up

migrate-down:
	goose -dir .sqlc/migrations postgres "$(DB_URL)" down

migrate-status:
	goose -dir .sqlc/migrations postgres "$(DB_URL)" status

migrate-create:
	@read -p "Enter migration name: " name; \
	goose -dir .sqlc/migrations create $$name sql

sqlc:
	sqlc generate

build:
	go build -o bin/server ./cmd/server

run: build
	./bin/server

dev:
	air -c .air.toml

test:
	go test -v ./...

clean:
	rm -rf bin/
	rm -rf tmp/