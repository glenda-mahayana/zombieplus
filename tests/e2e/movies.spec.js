const { test, expect } = require('@playwright/test')

const data = require('../support/fixtures/movies.json');
const { LoginPage } = require('../pages/LoginPage');
const { Toast } = require('../pages/Components');
const { MoviesPage } = require('../pages/MoviesPage');
const { executeSQL } = require('../support/database');

let loginPage;
let toast;
let moviesPage;

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page);
    toast = new Toast(page);
    moviesPage = new MoviesPage(page);
})

test('deve poder cadastrar um novo filme', async ({ page }) => {
    //é importante estar logado
    const movies = data.create
    await executeSQL(`DELETE FROM movies WHERE title = '${movies.title}';`)
    // await executeSQL("DELETE FROM movies WHERE title = $1",[movies.title]);

    await loginPage.visit();
    await loginPage.submit('admin@zombieplus.com', 'pwd123');
    await moviesPage.isLoggedIn();
    await moviesPage.create(movies.title, movies.overview, movies.company_id, movies.release_year);
    await toast.containText('Cadastro realizado com sucesso!')

})