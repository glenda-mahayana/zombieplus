require('dotenv').config()
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

async function executeSQL(sqlScript, params = []) {
    try {
        const result = await pool.query(sqlScript, params);
        console.log(result.rows);
        return result.rows;

    } catch (error) {
        console.error('Erro ao executar SQL:', error);
        throw error;
    }
}

module.exports = { executeSQL };

