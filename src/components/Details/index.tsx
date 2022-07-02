import { ReactNode } from 'react'

const Details: React.FC<{ children: ReactNode }> = ({ children }) => {
	return <div className='flex flex-col items-center'>{children}</div>
}

export default Details
