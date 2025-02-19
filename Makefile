build:
	docker-compose build --no-cache
run: build
	docker-compose up
clean:
	docker-compose down || true
	docker system prune -f || true