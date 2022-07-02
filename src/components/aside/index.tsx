import { ShadowIcon } from '@radix-ui/react-icons'
import { ICON_SIZE } from '~/lib'
import NextLink from 'next/link'
import Navigation from './Navigation.server'
import UserFooter from '../User/UserFooter.server'
import { Suspense } from 'react'
import { LinkSkelton } from '../Skeletons'

export default function Aside() {
	return (
		<aside className=' overflow-scroll border-l-2 border-solid border-x-slate-100 h-screen w-64 flex flex-col justify-between gap-3 px-2 '>
			<div className='my-5'>
				<NextLink href={'/'} passHref>
					<a>
						<ShadowIcon width={ICON_SIZE * 1.5} height={ICON_SIZE * 1.5} />
						<span>برنامج ادارة الملحقين</span>
					</a>
				</NextLink>
			</div>

			<Suspense fallback={<LinkSkelton />}>
				<Navigation />
			</Suspense>
			<Suspense fallback={<LoadingState />}>
				<UserFooter />
			</Suspense>
		</aside>
	)
}

const LoadingState = () => {
	return (
		<div className='border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto'>
			<div className='animate-pulse flex space-x-4'>
				<div className='rounded-full bg-slate-700 h-10 w-10'></div>
				<div className='flex-1 space-y-6 py-1'>
					<div className='h-2 bg-slate-700 rounded'></div>
					<div className='space-y-3'>
						<div className='grid grid-cols-3 gap-4'>
							<div className='h-2 bg-slate-700 rounded col-span-2'></div>
							<div className='h-2 bg-slate-700 rounded col-span-1'></div>
						</div>
						<div className='h-2 bg-slate-700 rounded'></div>
					</div>
				</div>
			</div>
		</div>
	)
}
