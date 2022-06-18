import React from 'react'

export default function Lists(
	props: React.PropsWithChildren<{
		[key: string]: any
	}>
) {
	return <div className='w-[500px]'>{props.children}</div>
}
