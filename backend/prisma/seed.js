const { PrismaClient } = require('@prisma/client')
// Si usas 'bcrypt' nativo en lugar de 'bcryptjs', cámbialo en el require
const bcrypt = require('bcryptjs') 
const prisma = new PrismaClient()

async function main() {
  // 1. Encriptar la contraseña para que el login del backend la valide correctamente
  const hashedPassword = await bcrypt.hash('12345678', 10)

  // 2. Crear el usuario de prueba para E2E
  await prisma.user.upsert({
    where: { email: 'abcd@abcd.com' },
    update: {},
    create: {
      email: 'abcd@abcd.com',
      password: hashedPassword,
    },
  })

  // 3. Crear una tarea de ejemplo (ajustado a tu modelo Task)
  await prisma.task.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      text: 'Tarea de ejemplo para pruebas',
      completed: false,
    },
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })