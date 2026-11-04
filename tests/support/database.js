const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'zombieplus',
    password: 'pwd123',
    port: 5432
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

