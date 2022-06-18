import Header from 'components/header'
import Layout from 'components/layout'
import Tabs, { Tab } from 'components/tabs'
import { withSessionSsr } from 'lib/session'
import { prisma } from 'lib/prisma'
import Link from 'next/link'
import Button from 'components/button'
import useSWR from 'swr'

export default function Data() {
	const { data, error } = useSWR('/api/data')
	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	return (
		<Layout>
			<Header title='الملحقين'>
				<div className='flex items-center justify-between my-0'>
					<details>
						<summary>تصفية</summary>
						<Tabs>
							<Tab>A</Tab>
							<Tab>A</Tab>
							<Tab>A</Tab>
							<Tab>A</Tab>
							<Tab>A</Tab>
						</Tabs>
					</details>
					<Tabs>
						<Link href={'/data/create'} passHref>
							<Button
								className='bg-green-300 border-2 border-black text-white font-bold'
								title='إنشاء جديد'
							>
								إنشاء ملحق جديد
							</Button>
						</Link>
					</Tabs>
				</div>
			</Header>
			<div className='overflow-scroll w-[80vw]'>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
				<h1>A</h1>
			</div>
		</Layout>
	)
}

export const getServerSideProps = withSessionSsr(
	async function getServerSideProps({ req, query }) {
		const { take = 25, skip = 0 }: { take?: number; skip?: number } = query
		const appends = await prisma?.append.findMany({
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
				props: false,
			}
		}

		return {
			props: {
				appends: JSON.parse(JSON.stringify(appends)),
				user: req.session.user,
			},
		}
	}
)
