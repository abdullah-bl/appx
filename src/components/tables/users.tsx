import type { User } from '@prisma/client'
import Avatar from 'components/avatar'
import { useRouter } from 'next/router'

const UsersTable = ({ users }: { users: User[] }) => {
	const { query } = useRouter()
	console.log(query)
	if (query?.type === 'users' || query?.type === 'all') {
		return (
			<div
			// sx={{
			// 	border: '1px solid #eee',
			// 	margin: 10,
			// 	padding: 10,
			// 	borderRadius: 5,
			// }}
			>
				<h2> المستخدمين </h2>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Username</th>
							<th>Admin</th>
							<th>Created At</th>
							<th>Updated At</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user: User) => (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>{user.name}</td>
								<td>{user.username}</td>
								<td>{user.admin ? '✓' : ''}</td>
								<td>{new Date(user.createdAt).toDateString()}</td>
								<td>{new Date(user.updatedAt).toDateString()}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}
	return null
}

export default UsersTable
