import { ReactNode } from 'react'

type Props = {
	list: ReactNode
	details: ReactNode
}

export default function ListViewLayout({ list, details }: Props) {
	return (
		<div className='flex items-start'>
			<div className='bg-white h-screen w-1/3 flex flex-col items-center'>
				{list && <h1>Users</h1>}
			</div>
			<div className='w-full h-screen flex flex-col bg-slate-100'>
				{details}
			</div>
		</div>
	)
}
