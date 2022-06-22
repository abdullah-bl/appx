import Header from 'components/header'
import Layout from 'components/layout'
import Tabs, { Tab } from 'components/tabs'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { prisma } from 'lib/prisma'
import { Append, Employee } from '@prisma/client'

export default function EditAppend({ append }: { append: Append }) {
	const { query } = useRouter()
	console.log(append)
	return (
		<Layout>
			<Header title='الملحقين'>
				<Tabs>
					<Tab>المستخدمين</Tab>
					<Tab>الموظفين</Tab>
					<Tab>الملحقين</Tab>
				</Tabs>
			</Header>
		</Layout>
	)
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	if (!Number(ctx.query.id)) {
		return {
			redirect: {
				destination: '/',
			},
		}
	}

	const { id } = ctx.query as { id: string }
	const append = await prisma.append.findUnique({
		where: {
			id: parseInt(id),
		},
		include: {
			employee: {
				include: {
					unit: true,
					department: true,
				},
			},
			branch: true,
			unit: true,
			department: true,
		},
	})

	if (!append) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			append: JSON.parse(JSON.stringify(append)),
		},
	}
}
