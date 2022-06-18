import Layout from 'components/layout'
import { useRouter } from 'next/router'
import useUser from 'hooks/useUser'
import Avatar from 'components/avatar'
import { withSessionSsr } from 'lib/session'
import { prisma } from 'lib/prisma'
import Skeletons from 'components/skeletons'
import ListViewLayout from 'components/layout/ListViewLayout'

export default function Users() {
	const { push } = useRouter()
	const { data, mutate } = useUser()
	return (
		<Layout>
<<<<<<< HEAD
			<ListViewLayout
				list={<div />}
				details={
					<div className='flex flex-col items-center'>
						<h1>Users</h1>
					</div>
				}
			/>
=======
			<div className='flex items-start'>
				<div className='bg-white h-screen overflow-scroll w-1/3 flex flex-col items-center'>
					<h1>Users</h1>
					<Skeletons />
					<Skeletons />
					<Skeletons />
					<Skeletons />
					<Skeletons />
					<Skeletons />
					<Skeletons />
					<Skeletons />
					<Skeletons />
					<Skeletons />

					<Skeletons />
					<Skeletons />
					<Skeletons />
					<Skeletons />
					<Skeletons />

					<Skeletons />
					<Skeletons />
					<Skeletons />
					<Skeletons />
					<Skeletons />

					<Skeletons />
					<Skeletons />
					<Skeletons />
					<Skeletons />

					<Skeletons />
					<Skeletons />
					<Skeletons />
					<Skeletons />
					<Skeletons />
				</div>
				<div className='w-full h-screen flex flex-col bg-slate-100'>
					details
				</div>
			</div>
>>>>>>> c1b98ea83e1205b7d7962bf4316cfc3597621bd1
		</Layout>
	)
}

export const getServerSideProps = withSessionSsr(
	async function getServerSideProps({ req, query }) {
		const user = req.session.user
			? await prisma.user.findUnique({
					where: {
						id: req.session.user?.id,
					},
			  })
			: null
		const { take = 20, skip = 0 }: { take?: number; skip?: number } = query
		const users = await prisma.user.findMany({
			take: take,
			skip: skip,
		})

		if (!user?.admin) {
			return {
				redirect: {
					destination: '/',
					permanent: false,
				},
				props: {},
			}
		}
		if (!user) {
			return {
				redirect: {
					destination: '/login',
					permanent: false,
				},
				props: {},
			}
		}

		return {
			props: {
				user: JSON.parse(JSON.stringify({ ...user, password: undefined })),
				users: JSON.parse(
					JSON.stringify(users.map((u) => ({ ...u, password: null })))
				),
			},
		}
	}
)
