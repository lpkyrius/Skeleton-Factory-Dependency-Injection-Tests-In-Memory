import Knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const connection = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

async function dbInit() {
  let knex = Knex({
    client: 'mysql2',
    connection
  });

  await knex.raw('CREATE DATABASE IF NOT EXISTS ??', [process.env.DB_NAME]);

  knex = Knex({
      client: 'mysql2',
      connection: {
        ...connection,
        database: process.env.DB_NAME,
      }
  });
}

const db =  Knex({
  client: 'mysql2',
  connection: {
    ...connection,
    database: process.env.DB_NAME,
  }
});

async function dbClose() {
  try {
    // Close the Knex connection
    await db.destroy();
    console.log('Database connection closed successfully.');
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
}

export {
  dbInit,
  db,
  dbClose
};