import Tabs, { Tab } from 'components/tabs'
import { useRouter } from 'next/router'

export function SettingsTabs() {
	const { pathname, push } = useRouter()
	return (
		<Tabs>
			<Tab active={pathname === '/s'} onClick={() => push('/s')}>
				عامة
			</Tab>
			{/* <Tab active={pathname === '/s/u'} onClick={() => push('/s/u')}>
				المستخدمين
			</Tab> */}
			<Tab> A </Tab>
		</Tabs>
	)
}
