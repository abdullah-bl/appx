import Header from '~/components/Header'
import { PageLayout } from '~/components/Layouts'
import Tabs, { Tab } from '~/components/Tabs'

export default function AppendData({}) {
	return (
		<PageLayout>
			<Header title='الملحقين'>
				<Tabs>
					<Tab>المستخدمين</Tab>
					<Tab>الموظفين</Tab>
					<Tab>الملحقين</Tab>
				</Tabs>
			</Header>
		</PageLayout>
	)
}
