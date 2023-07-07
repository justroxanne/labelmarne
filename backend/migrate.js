const fs = require('fs');
const mysql = require('mysql2/promise');
const path = require('path');

require('dotenv').config();

const migrationsDir = path.resolve(`${__dirname}/../db/`);

const migrate = async () => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const migrations = fs.readdirSync(migrationsDir);

  const connection = await mysql.createConnection({
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  });

  Promise.all(
    migrations.map((migrationFile) =>
      connection.query(
        fs.readFileSync(`${migrationsDir}/${migrationFile}`).toString()
      )
    )
  )
    .then(() => {
      console.log('All migrations successfully executed');
      process.exit(0);
    })
    .catch((error) => {
      console.error(error);
    });
};

try {
  migrate();
} catch (err) {
  console.error(err);
}
