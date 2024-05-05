.PHONY: build build--no-cache up down restart dbinit

build:
	docker-compose build

build--no-cache:
	docker-compose build --no-cache

up:
	docker-compose up

down:
	docker-compose down

restart:
	make down && make up
