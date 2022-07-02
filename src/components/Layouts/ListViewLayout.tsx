import { ReactElement, ReactNode } from 'react'
import { PageLayout } from '.'

type Props = {
	list: ReactNode
	children: ReactNode
}

export const ListViewLayout: React.FC<Props> = ({ list, children }) => {
	return (
		<div className='flex items-start'>
			<div className='bg-white h-screen w-[26em] flex flex-col items-center'>
				{list && <h1>Users</h1>}
			</div>
			<div className='w-full h-screen flex flex-col bg-slate-100'>
				{children}
			</div>
		</div>
	)
}
