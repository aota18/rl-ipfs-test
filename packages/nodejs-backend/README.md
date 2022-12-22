# 1. Packages

Install the packages before execute the servers.

```
$ npm install
```

# 2. Database

In this project, we use 'PostgreSQL' relational database.
Execute command below to install postgres image with docker into your local machine (Make sure the docker is installed on your machine). It will do:

- Pull postgres image and run it on port `5432`.
- Generates database name `redletter`.

```
$ ./start-db.sh
```

DB Connection configuration is in `.env` in this repo.

# 3. Run

After you install you packages and database, run the command below

This server runs on port `5055`.

```
$ npm run start:dev
```
