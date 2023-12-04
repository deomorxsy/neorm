## neorm
> basic user CRUD operations with Node, Sequelize and sqlite3.

controllers: business logic
migrations: sequelize orm migration files or schema changes
models: sequelize orm defining structure of the database tables
routes: express routes
public: static files
tests: tests

run with
```
node --watch src/server.js
```

test endpoints with curl by executing the .http files under ./tests/.
