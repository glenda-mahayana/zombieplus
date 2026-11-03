const { expect } = require('@playwright/test');

export class MoviesPage {
    constructor(page) {
        this.page = page;
    }
    
    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*admin/)
        // const logoutLink = this.page.locator('a[href="/logout"]')
        // await expect(logoutLink).toBeVisible()
    }

    async create(title, overview, company, release_year) {
       await this.page.locator('a[href$="register"]').click();
    //    await this.page.locator('input[name=title]').fill(title);

       await this.page.getByLabel('Titulo do filme').fill(title);
       await this.page.getByLabel('Sinopse').fill(overview);
    }
}
