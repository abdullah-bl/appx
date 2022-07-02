import { PageLayout } from '~/components/Layouts'
import { NextPage } from 'next'
import useUser from '~/hooks/useUser'
import Container from '~/components/Container'

const Home: NextPage = () => {
	return (
		<PageLayout title='Home Page'>
			<Container className=' w-full h-screen overflow-y-scroll '>
				<div className=' mx-auto my-0 max-w-3xl h-screen bg-white m-2 p-2'>
					<h1>Home Page</h1>
				</div>
			</Container>
		</PageLayout>
	)
}

export default Home
