import Header from 'components/header'
import Layout from 'components/layout'
import type { User, Append, Employee } from '@prisma/client'
import { SearchTabs } from 'components/pagesTabs/SearchTabs'
import { withSessionSsr } from 'lib/session'
import { prisma } from 'lib/prisma'

interface SearchProps {
	users?: User[]
	people?: Employee[]
	appends?: Append[]
}

export default function Search({}: SearchProps) {
	return (
		<Layout title='بحث'>
			<Header title='بحث'>
				<SearchTabs />
			</Header>
		</Layout>
	)
}

//
export const getServerSideProps = withSessionSsr(
	async function getServerSideProps({ req, query }) {
		const {
			keyword,
			take = 25,
			skip = 0,
		}: { keyword?: string; take?: number; skip?: number } = query

		const employees = await prisma?.employee.findMany({
			take: Number(take),
			skip: Number(skip),
			where: {
				OR: [
					{
						name: {
							contains: keyword,
						},
					},
				],
			},
		})

		const appends = await prisma?.append.findMany({
			take: Number(take),
			skip: Number(skip),
			where: {},
		})

		const branches = await prisma?.branch.findMany({
			take: Number(take),
			skip: Number(skip),
			where: {},
		})

		if (!req.session.user) {
			return {
				redirect: {
					destination: '/login',
					permanent: false,
				},
			}
		}

		return {
			props: {
				employees: JSON.parse(JSON.stringify(employees)),
				appends: JSON.parse(JSON.stringify(appends)),
				branches: JSON.parse(JSON.stringify(branches)),
			},
		}
	}
)
