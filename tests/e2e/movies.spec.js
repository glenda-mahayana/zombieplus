const { test, expect } = require('../support');

const data = require('../support/fixtures/movies.json');
const { executeSQL } = require('../support/database');

test('deve poder cadastrar um novo filme', async ({ page }) => {
    const movies = data.create
    await executeSQL(`DELETE FROM movies WHERE title = '${movies.title}';`)
    
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.create(movies.title, movies.overview, movies.company_id, movies.release_year, movies.cover, movies.featured);
    await page.popup.haveText(`O filme '${movies.title}' foi adicionado ao catálogo.`)

})

test('deve poder remover um filme', async ({ page, request }) => {
    const movies = data.to_remove
    await executeSQL(`DELETE FROM movies WHERE title = '${movies.title}';`)

    await request.api.postMovie(movies);
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.remove(movies.title);
    await page.popup.haveText('Filme removido com sucesso.')

})

test('não deve cadastrar quando o titulo é duplicado', async ({ page, request }) => {
    const movies = data.duplicate
    await executeSQL(`DELETE FROM movies WHERE title = '${movies.title}';`)

    await request.api.postMovie(movies);
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.create(movies.title, movies.overview, movies.company_id, movies.release_year, movies.cover, movies.featured);
    await page.popup.haveText(`O título '${movies.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)

})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.movies.goForm();
    await page.movies.submit();
    await page.movies.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'
    ])
})