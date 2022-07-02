import { ExitIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { Avatar } from './Avatar'
import Button from '../Button'

export default function UserFooter() {
	return (
		<div className='flex flex-col '>
			<Link href={'/users/[username]'} as={`/users/admin`} passHref>
				<div className='flex items-center bg-orange-300 rounded-xl border-2 border-black'>
					<Avatar username={'Admin'} color={'blue'} />
					<div className='flex items-center flex-col'>
						<span className='text-lg font-bold uppercase'>Admin</span>
						<span className='text-xs uppercase font-bold'>
							{true ? 'ADMIN' : 'USER'}
						</span>
					</div>
				</div>
			</Link>
			<Button
				className='bg-black color-white w-full mx-0 mb-0 rounded-xl border-2 border-black'
				onClick={async () => {}}
			>
				تسجيل الخروج
			</Button>
		</div>
	)
}
