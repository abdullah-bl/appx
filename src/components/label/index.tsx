import React from 'react'

export default function Label({ ...props }: React.HTMLProps<HTMLLabelElement>) {
	return <label className='py-1 mt-5' {...props} />
}
