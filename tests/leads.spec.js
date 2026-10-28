// @ts-check
import { test, expect } from '@playwright/test';

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('button', {name: /Aperte o play/}).click()
  expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')
  // await page.locator('#name').fill('glenda@test.com')
  // await page.locator('input[name=name]').fill('glenda@test.com')
  // await page.locator('input[placeholder="Seu nome completo"]').fill('glenda@test.com')

  await page.getByPlaceholder('Seu nome completo').fill('Glenda Rodrigues')
  await page.getByPlaceholder('Seu email principal').fill('glenda@test.com')

  await page.getByTestId('modal').getByText('Quero entrar na fila!').click()

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await expect(page.locator('.toast')).toHaveText(message)

  await expect(page.locator('.toast')).toBeHidden({ timeout: 5000 })

});

test('não deve cadastrar email incorreto', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('button', {name: /Aperte o play/}).click()
  expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')

  await page.getByPlaceholder('Seu nome completo').fill('Glenda Rodrigues')
  await page.getByPlaceholder('Seu email principal').fill('glendatest.com.br')

  await page.getByTestId('modal').getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Email incorreto')
  

});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('button', {name: /Aperte o play/}).click()
  expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')

  await page.getByPlaceholder('Seu nome completo').fill('')
  await page.getByPlaceholder('Seu email principal').fill('glenda@test.com')

  await page.getByTestId('modal').getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
  

});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('button', {name: /Aperte o play/}).click()
  expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')

  await page.getByPlaceholder('Seu nome completo').fill('Gabriel Rodrigues')
  await page.getByPlaceholder('Seu email principal').fill('')

  await page.getByTestId('modal').getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
  

});


