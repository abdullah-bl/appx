import React from 'react'

export default function Centered(
	props: React.HtmlHTMLAttributes<HTMLDivElement>
) {
	return (
		<div
			className={`flex items-center justify-center h-[90vh] w-full ${props.className}`}
			{...props}
		/>
	)
}
