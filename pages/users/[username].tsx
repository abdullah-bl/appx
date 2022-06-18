import Layout from 'components/layout'
import { prisma } from 'lib/prisma'
import { withSessionSsr } from 'lib/session'
import { User } from '@prisma/client'
import { useRouter } from 'next/router'
import Avatar from 'components/avatar'

export default function UserProfilePage({ user }: { user: User }) {
	// const {
	// 	data: { user },
	// 	mutate,
	// } = useUser()

	return (
		<Layout>
			<div>
				<Avatar username={user.name} />
				<h3>{user.name}</h3>
				<h4>{user.admin ? 'Admin' : 'User'}</h4>
			</div>
		</Layout>
	)
}

export const getServerSideProps = withSessionSsr(async (ctx) => {
	const user = ctx.req.session.user
		? await prisma.user.findUnique({
				where: {
					username: String(ctx?.query?.username),
				},
		  })
		: null

	if (!user) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			user: JSON.parse(JSON.stringify({ ...user, password: undefined })),
		},
	}
})
