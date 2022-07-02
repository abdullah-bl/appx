import { memo } from 'react'

export const Avatar = memo(
	({ username, color }: { username?: string; color?: string }) => {
		return (
			<div
				style={{ backgroundColor: color }}
				className={` h-10 w-10 rounded-full flex items-center justify-center bg-blue-700 m-3 border border-black `}
			>
				<span className='font-bold text-lg'>
					{username?.charAt(0).toLocaleUpperCase()}
				</span>
			</div>
		)
	}
)

Avatar.displayName = 'Avatar'
