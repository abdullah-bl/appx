import Header from '~/components/Header'
import { PageLayout } from '~/components/Layouts'
import type { User, Append, Employee } from '@prisma/client'
import { SearchTabs } from '~/components/PagesTabs/SearchTabs'

interface SearchProps {
	users?: User[]
	people?: Employee[]
	appends?: Append[]
}

export default function Search({}: SearchProps) {
	return (
		<PageLayout title='بحث'>
			<Header title='بحث'>
				<SearchTabs />
			</Header>
		</PageLayout>
	)
}
