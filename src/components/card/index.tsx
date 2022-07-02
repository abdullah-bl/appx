import { RANDOM_LIGHT_COLOR } from '~/lib'
import { useMemo } from 'react'
import CountUp from 'react-countup'

const Card = ({
	start = 0,
	end,
	title,
}: {
	title: string
	start?: number
	end: number
}) => {
	const color = useMemo(() => RANDOM_LIGHT_COLOR(), [])
	return (
		<div
			// style={{ backgroundColor: color }}
			className='flex flex-col items-center justify-center m-3 p-3 rounded-xl aspect-9 aspect-h-9  border-2 border-black'
		>
			<h2 className='text-3xl'>
				<CountUp start={start} end={end} />
			</h2>
			<h3 className='font-bold'>{title}</h3>
		</div>
	)
}

export default Card
