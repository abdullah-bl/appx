import { PageLayout } from '~/components/Layouts'
import { ListViewLayout } from '~/components/Layouts/ListViewLayout'
import { NextPageWithLayout } from '../_app'
import Details from '~/components/Details'

const Employees: NextPageWithLayout = () => {
	return (
		<PageLayout title='Employees'>
			<ListViewLayout list={<div />}>
				<Details>
					<h1> Hello world </h1>
				</Details>
			</ListViewLayout>
		</PageLayout>
	)
}

export default Employees
