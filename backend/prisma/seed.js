/* global require, process */
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs') 
const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('12345678', 10)

  await prisma.user.upsert({
    where: { email: 'abcd@abcd.com' },
    update: {},
    create: {
      email: 'abcd@abcd.com',
      password: hashedPassword,
    },
  })

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