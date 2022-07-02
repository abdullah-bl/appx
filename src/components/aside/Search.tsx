import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { ICON_SIZE } from '~/lib'
import { useRouter } from 'next/router'
import React, { memo } from 'react'
import querystring from 'query-string'
import Input from '~/components/Input'

export const SearchComponent = memo(() => {
	const { pathname, push, query } = useRouter()
	const handleSearch = (event: any) => {
		if (event.code === 'Enter') {
			if (event.target.value === '') {
				return push(`${pathname}`)
			}
			let q = querystring.stringify({
				...query,
				keyword: event.target.value.trim(),
			})

			return push(`${pathname}?${q}`)
		}
	}
	return (
		<div>
			<Input
				onFocus={() => (pathname !== '/search' ? push('/search') : null)}
				className='mt-8 pr-8'
				type={'search'}
				defaultValue={query?.keyword}
				autoFocus={pathname === '/search'}
				onKeyUpCapture={handleSearch}
				autoCorrect={'on'}
				autoCapitalize={'on'}
				autoComplete={'on'}
				placeholder='بحث ...'
			/>
			<div className='-mt-11 mr-1'>
				<MagnifyingGlassIcon width={ICON_SIZE} height={ICON_SIZE} />
			</div>
		</div>
	)
})

SearchComponent.displayName = 'SearchComponent'
