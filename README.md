# Full Stack Open Relational Databases

This repository is used for the Relational Database module of the FullstackOpen course at U of Helsinki

This is an upgraded version of the blog server from earlier in the course. The earlier version used MongoDB,
but the current version has been refactored to use PostgreSQL. Many more endpoints and more complex logic have also 
been added. 

###  Running the app
The app can be run by starting the docker containers individually, or all at once with `docker compose up`

### Adding Example Data
Add sample seeder data using the command `npx sequelize-cli db:seed:all`



