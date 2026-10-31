const {test} = require ('@playwright/test');

test('deve logar como administrador', async ({ page }) => {
    await page.goto('http://localhost:3000/admin')

    const loginForm = page.locator('.login-form')
    expect(loginForm).toBeVisible()

})