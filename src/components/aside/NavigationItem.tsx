import Link from 'next/link'
import { ReactElement } from 'react'

export type ItemType = {
	icon: ReactElement
	label: string
	href: string
	isActive?: boolean
}

export const NavigationItem = ({ href, label, isActive, icon }: ItemType) => (
	<Link href={href} passHref>
		<a
			className={` cursor-default space-x-3 rounded-md px-2 py-1.5 font-medium  p-1 gap-2 flex w-full items-center hover:bg-gray-200 ${
				isActive ? 'bg-gray-200' : 'transparent'
			}`}
		>
			{icon}
			{label}
		</a>
	</Link>
)
