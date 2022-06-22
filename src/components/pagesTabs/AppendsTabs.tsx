import Tabs, { Tab } from 'components/tabs'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const AppendsTabs = () => {
	const [active, serActive] = useState('')
	const { pathname, push } = useRouter()
	return (
		<Tabs>
			<Tab> A </Tab>
			<Tab> A </Tab>
			<Tab> A </Tab>
		</Tabs>
	)
}
