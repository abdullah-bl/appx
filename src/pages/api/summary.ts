import type { NextApiRequest, NextApiResponse } from 'next'
import nx from 'next-connect'
import { prisma } from 'lib/prisma'
import { withSessionRoute } from 'lib/session'
import { IResponse } from 'types'

const handler = nx<NextApiRequest, NextApiResponse<IResponse>>()

handler.use(async (req, res, next) => {
  if (!req.session.user) {
    res.status(401).json({
      status: 'error',
      message: 'User not logged in',
    })
    return
  }
  next()
})

handler.get(async (req, res) => {

  const appends = await prisma.append.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      employee: true,
      unit: true,
      department: true,
      branch: true
    }
  })

  const data = {
    people: {
      active: await prisma.employee.count({
        where: {
          active: true,
        }
      }),
      inactive: await prisma.employee.count({
        where: {
          active: false
        }
      })
    },
    appends: {
      total: appends.length,
      active: appends.filter((append: any) => append.end >= new Date()).length,
      ended: appends.filter((append: any) => append.end <= new Date()).length,
      internal: appends.filter((append: any) => append.internal).length,
      external: appends.filter((append: any) => !append.internal).length,
      latest: appends.slice(0, 5),
      // less than month
      lessThanMonth: appends.filter((append: any) => new Date(append.end).getTime() - new Date().getTime() < 1000 * 60 * 60 * 24 * 30),
      endSoon: appends.filter((append: any) => append.end <= new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 30))).slice(0, 20),
    },
    branches: await prisma.branch.count(),
    units: await prisma.unit.count(),
    departments: await prisma.department.count()
  }

  res.json({
    status: 'success',
    message: 'Got Static Result successful',
    data,
  })
})

export default withSessionRoute(handler)
