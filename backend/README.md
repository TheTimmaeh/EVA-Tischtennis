# EVA-Tischtennis Backend

## Project setup
```
npm i
```

### Run server for development
```
npm start
```

#### Migrate DB
Before running, make sure to migrate to the latest version using:

```
npm run migrate:latest
```

Create a new migration using:

```
npx knex migrate:make [migration_name] --knexfile src/db/knexfile.js
```

You can also fill the database with test data (this will erase all existing data!) using:

```
npm run seed
npx knex seed:run --specific=[seed_filename].js --knexfile src/db/knexfile.js
```
