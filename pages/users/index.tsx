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
			<ListViewLayout
				list={<div />}
				details={
					<div className='flex flex-col items-center'>
						<h1>Users</h1>
					</div>
				}
			/>
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
