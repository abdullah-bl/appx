import { ReactHTMLElement } from 'react'

const Page: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
	return (
		<div className='w-full h-screen flex flex-col bg-slate-100' {...props}>
			{props.children}
		</div>
	)
}
