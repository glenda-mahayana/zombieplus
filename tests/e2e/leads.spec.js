// @ts-check
const { test, expect } = require('@playwright/test');
const { LandingPage } = require('../pages/LandingPage');

let landingPage;

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
});

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
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
 await landingPage.visit()
 await landingPage.openLeadModal() 
 await landingPage.submitLeadForm('Glenda Rodrigues', 'glendatest.com.br')
 await landingPage.alertHaveText('Email incorreto')
  
});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal() 
  await landingPage.submitLeadForm('', 'glenda@test.com')

  await landingPage.alertHaveText('Campo obrigatório')
  
});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal() 
  await landingPage.submitLeadForm('Glenda Rodrigues', '')

  await landingPage.alertHaveText('Campo obrigatório')
  
});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal() 
  await landingPage.submitLeadForm('', '')

  await landingPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])

});

