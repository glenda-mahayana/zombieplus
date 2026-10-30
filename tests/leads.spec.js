// @ts-check
const { test, expect } = require('@playwright/test');
const { LandingPage } = require('./pages/LandingPage')

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
 const landingPage = new LandingPage(page)

 await landingPage.visit()
 await landingPage.openLeadModal() 
 await landingPage.submitLeadForm('Glenda Rodrigues', 'glenda@test.com')
 
 const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
 await landingPage.toastHaveText(message)
  // await page.locator('#name').fill('glenda@test.com')
  // await page.locator('input[name=name]').fill('glenda@test.com')
  // await page.locator('input[placeholder="Seu nome completo"]').fill('glenda@test.com')
});

test('não deve cadastrar email incorreto', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('button', {name: /Aperte o play/}).click()
  expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')

  await page.getByPlaceholder('Informe seu nome').fill('Glenda Rodrigues')
  await page.getByPlaceholder('Informe seu email').fill('glendatest.com.br')

  await page.getByTestId('modal').getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Email incorreto')
  

});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('button', {name: /Aperte o play/}).click()
  expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')

  await page.getByPlaceholder('Informe seu nome').fill('')
  await page.getByPlaceholder('Informe seu email').fill('glenda@test.com')

  await page.getByTestId('modal').getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
  

});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('button', {name: /Aperte o play/}).click()
  expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')

  await page.getByPlaceholder('Informe seu nome').fill('Gabriel Rodrigues')
  await page.getByPlaceholder('Informe seu email').fill('')

  await page.getByTestId('modal').getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
  

});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('button', {name: /Aperte o play/}).click()
  expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')

  await page.getByPlaceholder('Informe seu nome').fill('')
  await page.getByPlaceholder('Informe seu email').fill('')

  await page.getByTestId('modal').getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText(['Campo obrigatório', 'Campo obrigatório'])

});

