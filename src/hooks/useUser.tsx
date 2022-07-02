import { trpc } from '~/utils/trpc'

export default function useUser() {
	const context = trpc.useContext()
	return trpc.useQuery(['users.me'], {
		retryOnMount: true,
		// refetchOnWindowFocus: true,
		onError(error) {
			console.log(error)
			context.invalidateQueries()
		},
	})
}
