// export default function Button({
// 	className,
// 	...rest
// }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
// 	return (
// 		<button
// 			title='button'
// 			type='button'
// 			{...rest}
// 			className={` min-w-[10em] flex justify-center items-center p-2 rounded m-4 bg-blue-700 text-white focus:bg-blue-800 ${className}`}
// 		/>
// 	)
// }

import * as React from 'react'

const Button = React.forwardRef(
	(props: React.ButtonHTMLAttributes<HTMLButtonElement>, ref: any) => {
		return (
			<button
				title='button'
				type='button'
				ref={ref}
				{...props}
				className={`min-w-[10em] flex justify-center items-center p-2 rounded m-4 bg-blue-700 text-white focus:bg-blue-800 ${props.className}`}
			/>
		)
	}
)

Button.displayName = 'Button'

export default Button
