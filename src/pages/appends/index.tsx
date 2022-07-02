import { PageLayout } from '~/components/Layouts'
import { prisma } from '~/lib/prisma'
import { NextPageWithLayout } from '../_app'
import { ReactElement } from 'react'

const AppendsPage: NextPageWithLayout = () => {
	return (
		<PageLayout title='Home Page'>
			<h1>Appends Page </h1>
		</PageLayout>
	)
}

export default AppendsPage
