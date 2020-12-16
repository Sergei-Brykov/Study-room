FROM node:14.15.0

WORKDIR /usr/app

RUN apt-get update

RUN apt-get -y install nano htop

RUN npm install

EXPOSE 3000

CMD bash -c "while true; do sleep 1; done"
