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
	const { keyword, sortBy, take = 20, skip = 0 } = req.query

	if (!keyword) {
		res.status(400).json({
			status: 'error',
			message: 'Missing keyword',
			query: req.query,
		})
		return
	}

	// const users = await prisma.user.findMany({
	// 	take: Number(take),
	// 	skip: Number(skip),
	// 	where: {
	// 		OR: [
	// 			{
	// 				name: {
	// 					contains: String(keyword),
	// 				},
	// 			},
	// 			{
	// 				username: {
	// 					contains: String(keyword),
	// 				},
	// 			},
	// 		],
	// 	},
	// })

	const data = {
		// users: users.map((user) => ({ ...user, password: undefined })),
		// append: await prisma.append.findMany({
		// 	take: Number(take),
		// 	skip: Number(skip),
		// 	where: {
		// 		// OR: [
		// 		// 	{
		// 		// 		start: {
		// 		// 			equals: String(keyword),
		// 		// 		},
		// 		// 	},
		// 		// 	{
		// 		// 		end: {
		// 		// 			equals: String(keyword),
		// 		// 		},
		// 		// 	},
		// 		// ],
		// 	},
		// 	include: {
		// 		person: true,
		// 	},
		// }),
		// people: await prisma.person.findMany({
		// 	take: Number(take),
		// 	skip: Number(skip),
		// 	where: {
		// 		OR: [
		// 			{
		// 				name: {
		// 					contains: String(keyword),
		// 				},
		// 			},
		// 			{
		// 				no: {
		// 					equals: Number(keyword),
		// 				},
		// 			},
		// 			{
		// 				branch: {
		// 					name: {
		// 						contains: String(keyword),
		// 					},
		// 				},
		// 			},
		// 			{
		// 				Unit: {
		// 					name: {
		// 						contains: String(keyword),
		// 					},
		// 				},
		// 			},
		// 			{
		// 				Department: {
		// 					name: {
		// 						contains: String(keyword),
		// 					},
		// 				},
		// 			},
		// 		],
		// 	},
		// }),
		units: await prisma.unit.findMany({
			orderBy: [
				{
					name: sortBy === 'asc' ? sortBy : 'desc',
				},
			],
			take: Number(take),
			skip: Number(skip),
			include: {
				departments: true,
				branch: true,
			},
			where: {
				OR: [
					{},
					{
						name: {
							contains: String(keyword),
						},
					},
					{
						departments: {
							some: {
								name: {
									contains: String(keyword),
								},
							},
						},
					},
				],
			},
		}),
	}

	console.log('Server =', data)

	res.json({
		status: 'success',
		message: 'Got Search Result successful',
		data,
		query: req.query,
	})
})

export default withSessionRoute(handler)
