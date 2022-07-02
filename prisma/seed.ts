import { hashPassword } from '../src/backend/lib/bcrypt'
import { RANDOM_COLOR } from '../src/lib'
import { prisma } from '../src/backend/lib/prisma'

async function main() {
  let i = 0
  const users = await prisma.user.count()

  if (users === 0) {
    await prisma.user.create({
      data: {
        name: 'Admin',
        username: 'admin',
        admin: true,
        password: await hashPassword('admin'),
        color: RANDOM_COLOR()
      }
    })
    console.log('user created')
  }
}



main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
