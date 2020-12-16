build:
	docker build -t my_node ./docker/node/
	docker pull mongo

vol:
	docker volume create dbdata

up:
	docker run -d -v dbdata:/data/db -p 27017:27017 --name mongodb mongo
	docker run -d -v $(PWD)/code/:/usr/app --link mongodb:db --name node1 -p 3000:3000 -p 5000:5000 -p 9229:9229 my_node

start:
	docker start  mongodb
	docker start  node1

shell:
	docker exec -it --user="1000" node1 bash

shmongo:
	docker exec -it mongodb bash

clear:
	docker stop node1 && docker rm node1 && docker stop mongodb && docker rm mongodb