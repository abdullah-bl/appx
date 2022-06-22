import { ReactNode } from 'react'

export default function Header({
	title,
	children,
}: {
	title?: string
	children?: ReactNode
}) {
	return (
		<header className='flex w-full flex-col pb-4 p-7 gap-3 border-b-2 border-slate-100'>
			<h2 className='font-bold text-xl'>{title}</h2>
			{children}
		</header>
	)
}
