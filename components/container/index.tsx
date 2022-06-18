import { ReactNode } from 'react'

export default function Container({ children }: { children: ReactNode }) {
	return (
		<div className='flex flex-1 flex-col w-full h-screen scroll-smooth'>
			{children}
		</div>
	)
}
