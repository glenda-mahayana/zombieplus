// @ts-check
const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { LandingPage } = require('../pages/LandingPage');
const { Toast } = require('../pages/Components');

let landingPage;
let toast;

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
  toast = new Toast(page)
});

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();
  
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await toast.haveText(message)
  // await page.locator('#name').fill('glenda@test.com')
  // await page.locator('input[name=name]').fill('glenda@test.com')
  // await page.locator('input[placeholder="Seu nome completo"]').fill('glenda@test.com')
});

test('não deve cadastrar quando o email ja existe', async ({ page, request }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  const newLead = await request.post('http://localhost:3333/leads', {
    data:{
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await toast.haveText(message)
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

