const postgres = require("pg-promise")();

const dbconnection = {
    host: 'localhost',
    port:5432,
    database: 'postgres',
    user: 'postgres',
    password: 'Tachyon_9667'
}

const postgresdb = postgres(dbconnection)

module.exports = postgresdb;