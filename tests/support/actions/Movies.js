const { expect } = require('@playwright/test');

export class Movies {
    constructor(page) {
        this.page = page;
    }

    async goForm() {
        await this.page.locator('a[href="/admin/movies/register"]').click();
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click();
    }

    async create(title, overview, company, release_year, cover, featured) {
        await this.goForm();
        //    await this.page.locator('input[name=title]').fill(title);

        await this.page.getByLabel('Titulo do filme').fill(title);
        await this.page.getByLabel('Sinopse').fill(overview);
        await this.page.locator('#select_company_id .react-select__indicator').click();
        await this.page.locator('.react-select__option').filter({ hasText: company }).click();

        await this.page.locator('#select_year .react-select__indicator').click();
        await this.page.locator('.react-select__option').filter({ hasText: release_year }).click();

        console.log('Valor recebido:', cover);

        console.log(
            'Caminho completo:',
            'tests/support/fixtures/movies/' + cover
        );

        await this.page.locator('input[name=cover]').setInputFiles('tests/support/fixtures/covers/movies/' + cover);
        
        if (featured) {
            await this.page.locator('.featured .react-switch').click();
        }
        
        await this.submit();
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)

    }
}
