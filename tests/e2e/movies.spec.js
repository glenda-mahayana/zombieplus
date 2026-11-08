const { test, expect } = require('../support');

const data = require('../support/fixtures/movies.json');
const { executeSQL } = require('../support/database');

test('deve poder cadastrar um novo filme', async ({ page }) => {
    const movies = data.create
    await executeSQL(`DELETE FROM movies WHERE title = '${movies.title}';`)
    // await executeSQL("DELETE FROM movies WHERE title = $1",[movies.title]);
    
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.create(movies.title, movies.overview, movies.company_id, movies.release_year, movies.cover, movies.featured);
    await page.toast.containText('Cadastro realizado com sucesso!')

})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.movies.goForm();
    await page.movies.submit();
    await page.movies.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ])
})