import React from 'react'

export interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
	active?: boolean
}

export const Tab = (props: TabProps) => (
	<div
		className={`flex items-center cursor-pointer px-4 py-2 rounded-md ${
			props.active ? 'bg-gray-200' : 'bg-white'
		}`}
		{...props}
	>
		{props.children}
	</div>
)

export default function Tabs(props: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div {...props} className={`flex items-center gap-2 ${props.className}`}>
			{props.children}
		</div>
	)
}
