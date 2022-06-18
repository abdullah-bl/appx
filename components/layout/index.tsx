import Aside from 'components/aside'
import useUser from 'hooks/useUser'
import Head from 'next/head'
import { ReactNode } from 'react'

import Container from 'components/container'

const Layout: React.FC<{ children: ReactNode; title?: string }> = ({
	children,
	title = 'Append',
}) => {
	const { data, error } = useUser()

	if (error) {
		return <div>Error {JSON.stringify(error)}</div>
	}

	if (!data && !error) {
		return <h3> Loading... </h3>
	}

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>

			<main className='flex w-screen h-screen'>
				<Aside />
				<Container>{children}</Container>
			</main>
		</>
	)
}

export default Layout
