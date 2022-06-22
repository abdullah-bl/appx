import * as React from 'react'

const Input = React.forwardRef(
	(props: React.InputHTMLAttributes<HTMLInputElement>, ref: any) => {
		return (
			<input
				placeholder='...'
				title='input'
				{...props}
				className=' box-border m-0 min-w-0 block p-2 mb-3 border  rounded w-full border-slate-300 focus:border-blue-600 focus:border-2  '
				ref={ref}
			/>
		)
	}
)

Input.displayName = 'Input'

export default Input
