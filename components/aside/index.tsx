import {
	ShadowIcon,
	PersonIcon,
	GearIcon,
	ListBulletIcon,
	ReaderIcon,
	IdCardIcon,
	BarChartIcon,
} from '@radix-ui/react-icons'
import { ICON_SIZE } from 'lib'
import useUser from 'hooks/useUser'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import Avatar from 'components/avatar'
import useSearch from 'hooks/useSearch'
// import { SearchComponent } from './Search'
import Button from 'components/button'

export default function Aside() {
	const { data, mutate } = useUser()
	const { pathname, push } = useRouter()
	const { query, handleSearch } = useSearch('')
	return (
		<aside className='border-l-2 border-solid border-x-slate-100 h-screen w-72 min-w-72 flex flex-col justify-between gap-3 p-5 '>
			<div className='my-5'>
				<NextLink href={'/'} passHref>
					<a>
						<ShadowIcon width={ICON_SIZE * 1.5} height={ICON_SIZE * 1.5} />
						<span>برنامج ادارة الملحقين</span>
					</a>
				</NextLink>
			</div>

			<nav className='flex flex-col gap-2'>
				{routes.map((route, index) => (
					<Item
						key={index}
						href={route.href}
						label={route.label}
						isActive={pathname === route.href}
						icon={route.icon}
					/>
				))}

				{data?.user?.admin && (
					<Item
						href='/users'
						label='المستخدمين'
						isActive={pathname === '/users'}
						icon={<PersonIcon width={18} height={18} />}
					/>
				)}
				{data?.user?.admin && (
					<Item
						href='/settings'
						label='الإعدادات'
						isActive={pathname === '/settings'}
						icon={<GearIcon width={18} height={18} />}
					/>
				)}
			</nav>

			{/* user info */}
			<div className='flex flex-col '>
				<NextLink
					href={'/users/[username]'}
					as={`/users/${data?.user?.username}`}
					passHref
				>
					<div className='flex items-center bg-orange-300 rounded-xl border-2 border-black'>
						<Avatar username={data?.user?.username} color={data?.user?.color} />
						<div className='flex  items-center flex-col'>
							<span className='text-lg font-bold'>{data?.user?.name}</span>
							<span className='text-xs'>
								{data?.user?.admin ? 'ADMIN' : 'USER'}
							</span>
						</div>
					</div>
				</NextLink>
				<Button
					className='bg-black color-white w-full mx-0 rounded-xl border-2 border-black'
					onClick={async () => {
						await fetch('/api/logout')
						mutate('/api/user')
					}}
				>
					تسجيل الخروج
				</Button>
			</div>
		</aside>
	)
}

type ItemType = {
	icon: ReactElement
	label: string
	href: string
	isActive?: boolean
}

const Item = ({ href, label, isActive, icon }: ItemType) => (
	<NextLink href={href} passHref>
		<span
			className={`
			text-lg cursor-pointer rounded p-1 gap-3 flex w-full items-center hover:bg-gray-200
			${isActive ? 'bg-gray-200' : 'transparent'}
			`}
		>
			{icon}
			{label}
		</span>
	</NextLink>
)

const routes: ItemType[] = [
	{
		href: '/',
		label: 'الإحصائيات',
		icon: <BarChartIcon color='black' width={18} height={18} />,
		isActive: false,
	},
	{
		href: '/data',
		label: 'الملحقين',
		icon: <ListBulletIcon color='black' width={18} height={18} />,
		isActive: false,
	},
	// {
	// 	href: '/employees',
	// 	label: 'الموظفين',
	// 	icon: <IdCardIcon color='black' width={18} height={18} />,
	// 	isActive: false,
	// },
	{
		href: '/reports',
		label: 'التقارير',
		icon: <ReaderIcon color='black' width={18} height={18} />,
		isActive: false,
	},
]
