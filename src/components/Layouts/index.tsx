import Aside from '~/components/Aside'
import Head from 'next/head'
import { ReactNode } from 'react'

import Container from '~/components/Container'

export const PageLayout: React.FC<{ children: ReactNode; title?: string }> = ({
	children,
	title = '',
}) => {
	return (
		<>
			<Head>
				<title>{` ${title} | Abdullah Bl`}</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>

			<main className='flex w-screen h-screen overflow-hidden z-10'>
				<Aside />
				<Container>{children}</Container>
			</main>
		</>
	)
}
