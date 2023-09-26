FROM node:16.20.2

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build
RUN npm install -g serve

EXPOSE 4000

CMD ["serve", "-l", "4000", "build"]

