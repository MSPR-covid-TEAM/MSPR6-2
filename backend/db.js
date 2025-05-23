require('dotenv').config();
const mysql = require('mysql2/promise');

const getConnection = async (dbName) => {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: dbName,
  });
};

module.exports = { getConnection };
