import { memo } from 'react'

const Avatar = memo(
	({ username, color }: { username?: string; color?: string }) => {
		return (
			<div
				style={{ backgroundColor: color }}
				className={`w-14 h-14 rounded-full mr-2 flex items-center justify-center bg-blue-700 m-3 border-2 border-black `}
			>
				<span className='font-bold text-lg'>
					{username?.charAt(0).toLocaleUpperCase()}
				</span>
			</div>
		)
	}
)

Avatar.displayName = 'Avatar'

export default Avatar
