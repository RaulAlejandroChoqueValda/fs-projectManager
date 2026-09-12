import { test, expect } from '@playwright/test'
 
test('un usuario puede iniciar sesion, crear una tarea y verla', async ({ page }) => {
  // 1. Entrar a la aplicación
  await page.goto('/')
 
  // 2. Iniciar sesión buscando por los placeholders exactos de tu LoginCard
  await page.getByPlaceholder('ejemplo@test.com').fill('abcd@abcd.com')
  await page.getByPlaceholder('******').fill('12345678')
  await page.getByRole('button', { name: 'Ingresar' }).click()
 
  // 3. Crear una tarea
  await page.getByPlaceholder('Escribe una nueva tarea').fill('Comprar pan')
  await page.getByRole('button', { name: 'Agregar Tarea' }).click()
 
  // 4. Verla en la lista
  await expect(page.getByText('Comprar pan')).toBeVisible()
})