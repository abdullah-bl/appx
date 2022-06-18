import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const ListView = ({ children }: Props) => {
	return (
		<div>
			<h1>ListView</h1>
			{children}
		</div>
	)
}

export default ListView
