import { PageLayout } from '~/components/Layouts'
import { ReactNode, useState } from 'react'
import Input from '~/components/Input'

export default function Settings() {
	return (
		<PageLayout>
			<div className='flex items-start'>
				<div className='bg-white h-screen w-1/3 flex flex-col items-center gap-1 px-2'>
					<div className='px-6 py-6'>
						<h1 className='font-mono font-bold text-lg'>Settings</h1>
					</div>

					<div className='w-full border-t border-slate-100 p-2 hover:bg-gray-200 rounded-lg'>
						<h3>About</h3>
						<h4>Description</h4>
					</div>
				</div>
				<div className='w-full h-screen flex flex-col bg-slate-100'>
					<div className=' mx-auto my-0 max-w-xs '>
						<h1>Hello World</h1>
					</div>
				</div>
			</div>
		</PageLayout>
	)
}

const Item = ({
	title,
	description,
	children,
}: {
	title?: string
	description?: string
	children?: ReactNode
}) => {
	return (
		<div className='flex justify-between items-center border p-4 rounded-md'>
			<div className=''>
				<h3 className='text-xl font-bold'>{title}</h3>
				<small className='font-thin'> {description} </small>
			</div>
			<div className=''>{children}</div>
		</div>
	)
}

const I = () => (
	<div className='pb-4 w-full'>
		<Input type={'search'} className='w-full rounded-full px-4' />
	</div>
)
