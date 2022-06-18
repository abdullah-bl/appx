
import { hashPassword } from '../lib/utils/bcrypt'
import { RANDOM_COLOR } from '../lib'
import { prisma } from '../lib/prisma'
import { Employee } from '@prisma/client'
// import { faker } from '@faker-js/faker'
// import type { Person, Prisma } from '@prisma/client'
// const isDev = process.env.NODE_ENV === 'development'

// const userData: Prisma.UserCreateInput[] = [
//   {
//     name: 'Admin',
//     username: 'admin',
//     admin: true,
//     password: await hashPassword('admin'),
//   },
//   {
//     name: 'User',
//     username: 'user',
//     admin: false,
//     password: 'user'
//   }
// ]


async function main() {
  let i = 0
  const users = await prisma.user.count()
  // if (!isDev) {
  // for (i = 0; i < 10; i++) {
  //   await prisma.employee.create({
  //     data: {
  //       name: String(Math.floor(Math.random() * 1000000)),
  //       no: Math.floor(Math.random() * 1000000),
  //       active: true,
  //       hiredDate: new Date('2000-01-01'),
  //       retirementDate: new Date('2099-01-01'),
  //       branchId: 1,
  //       unitId: 2,
  //       departmentId: 2
  //     },
  //   })
  // }

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
