import Tabs, { Tab } from '~/components/Tabs'
import React, { useState, useCallback, useContext, useEffect } from 'react'
import querystring from 'query-string'
import { useRouter } from 'next/router'

export const SearchTabs = () => {
	const [active, setActive] = useState('all')
	const [sortBy, setSortBy] = useState('')
	const { query, push, pathname } = useRouter()

	// useEffect(() => {
	// 	if (query.sortBy) {
	// 		setSortBy(query?.sortBy)
	// 	}
	// }, [])

	const filterByType = useCallback(
		(type: string) => {
			let q = querystring.stringify({
				...query,
				type,
			})
			setActive(type)

			return push(`${pathname}?${q}`)
		},
		[push, pathname, query]
	)

	const sortByfFun = useCallback(
		(sortBy: string) => {
			let q = querystring.stringify({
				...query,
				sortBy,
			})
			setSortBy(sortBy)

			return push(`${pathname}?${q}`)
		},
		[push, pathname, query]
	)

	return (
		<div className='flex justify-between items-center'>
			<Tabs>
				<Tab active={active === 'all'} onClick={() => filterByType('all')}>
					الكل
				</Tab>
				<Tab
					active={active === 'appends'}
					onClick={() => filterByType('appends')}
				>
					الإلحاق
				</Tab>
				<Tab
					active={active === 'people'}
					onClick={() => filterByType('people')}
				>
					الموظفين
				</Tab>
				<Tab active={active === 'units'} onClick={() => filterByType('units')}>
					الوحدات
				</Tab>
			</Tabs>
			<Tabs>
				<Tab> ترتيب حسب : </Tab>
				<Tab active={sortBy == 'asc'} onClick={() => sortByfFun('asc')}>
					الاحدث
				</Tab>
				<Tab active={sortBy == 'desc'} onClick={() => sortByfFun('desc')}>
					الاقدم
				</Tab>
			</Tabs>
		</div>
	)
}
