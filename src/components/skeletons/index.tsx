export default function Skeletons() {
	// random number between 0 and 100
	const random = Math.floor(Math.random() * 100)

	return (
		<div className=' w-full flex flex-col gap-1 p-2'>
			<div
				style={{ width: random }}
				className='bg-gray-200 animate-pulse h-4 rounded-md'
			/>
			<div className='bg-gray-200 animate-pulse h-4 w-full rounded' />
		</div>
	)
}
