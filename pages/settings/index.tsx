import Button from 'components/button'
import Container from 'components/container'
import Header from 'components/header'
import Layout from 'components/layout'
import { SettingsTabs } from 'components/pagesTabs'
import Skeletons from 'components/skeletons'
import Tabs, { Tab } from 'components/tabs'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'

export default function Settings() {
	const { pathname, push } = useRouter()
	return (
		<Layout>
			<div className='flex items-start'>
				<div className='bg-white h-screen w-1/3 flex flex-col items-center'>
					<div className='p-4'>
						<h1 className='font-mono text-lg'>Settings</h1>
					</div>
					<div className='w-full border-t border-slate-100 p-2'>
						<h3>About</h3>
						<h4>Description</h4>
					</div>
					<div className='w-full border-t border-slate-100 p-2'>
						<h3>About</h3>
						<h4>Description</h4>
					</div>
					<div className='w-full border-t border-slate-100 p-2'>
						<h3>About</h3>
						<h4>Description</h4>
					</div>
					<div className='w-full border-t border-slate-100 p-2'>
						<h3>About</h3>
						<h4>Description</h4>
					</div>
					<div className='w-full border-t border-slate-100 p-2'>
						<h3>Version</h3>
						<h4>Description</h4>
					</div>
				</div>
				<div className='w-full h-screen flex flex-col bg-slate-100'>
					details
				</div>
			</div>
		</Layout>
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
