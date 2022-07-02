import React, { ReactElement, ReactNode } from 'react'

const Container = (props: React.HTMLAttributes<HTMLDivElement>) => (
	<div className='w-full h-screen overflow-y-scroll' {...props} />
)

export default Container
