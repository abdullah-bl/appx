import {
	ShadowIcon,
	PersonIcon,
	GearIcon,
	ListBulletIcon,
	ReaderIcon,
	IdCardIcon,
	BarChartIcon,
} from '@radix-ui/react-icons'
import { useRouter } from 'next/router'
import { NavigationItem, ItemType } from './NavigationItem'

export default function Navigation() {
	const { pathname } = useRouter()

	return (
		<ul className='flex flex-col gap-1'>
			{true
				? admin_routes.map((route, index) => (
						<NavigationItem
							key={index}
							href={route.href}
							label={route.label}
							isActive={pathname === route.href}
							icon={route.icon}
						/>
				  ))
				: user_routes.map((route, index) => (
						<NavigationItem
							key={index}
							href={route.href}
							label={route.label}
							isActive={pathname === route.href}
							icon={route.icon}
						/>
				  ))}
		</ul>
	)
}

const user_routes: ItemType[] = [
	{
		href: '/',
		label: 'ملخص',
		icon: <BarChartIcon color='black' width={18} height={18} />,
		isActive: false,
	},
	{
		href: '/appends',
		label: 'الملحقين',
		icon: <ListBulletIcon color='black' width={18} height={18} />,
		isActive: false,
	},
	{
		href: '/employees',
		label: 'الموظفين',
		icon: <IdCardIcon color='black' width={18} height={18} />,
		isActive: false,
	},
	{
		href: '/reports',
		label: 'التقارير',
		icon: <ReaderIcon color='black' width={18} height={18} />,
		isActive: false,
	},
]

const admin_routes: ItemType[] = [
	...user_routes,
	{
		label: 'المستخدمين',
		href: '/users',
		icon: <PersonIcon color='black' width={18} height={18} />,
	},
	{
		label: 'الإعدادات',
		href: '/settings',
		icon: <GearIcon color='black' width={18} height={18} />,
	},
]

/*

<ul class="space-y-1">
	<h4 class="px-2 pt-5 pb-2 text-xs font-semibold text-gray-1000 text-opacity-40 dark:text-white">Online</h4>
		<li class="flex items-stretch space-x-1">
		<a target="_blank" rel="noopener noreferrer" class="flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium  text-gray-700 dark:text-gray-200 sm:hover:bg-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200" href="https://twitter.com/brian_lovin">
		<span class="flex items-center justify-center w-4">
		<svg viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg" width="16" height="14" fill="currentColor">
		<path d="M14.3617 3.35401C14.3687 3.49999 14.3713 3.64777 14.3713 3.79376C14.3713 8.29039 11.0696 13.4737 5.03217 13.4737C3.17739 13.4737 1.45304 12.9105 0 11.9445C0.859457 12.0522 1.73097 11.9833 2.56473 11.7418C3.39849 11.5003 4.17814 11.0908 4.85913 10.5369C4.17428 10.5235 3.51059 10.2886 2.96085 9.86516C2.41112 9.44169 2.00282 8.85078 1.79304 8.17505C2.28527 8.27044 2.79186 8.25042 3.27565 8.11647C2.53271 7.96035 1.8647 7.54285 1.38482 6.9347C0.904951 6.32655 0.642734 5.56518 0.642609 4.77959V4.73724C1.09843 5.00001 1.60823 5.14614 2.12957 5.16347C1.4338 4.6828 0.941284 3.94507 0.752536 3.10088C0.563788 2.25669 0.693041 1.36968 1.11391 0.620882C1.93808 1.67201 2.96639 2.53173 4.13207 3.14418C5.29774 3.75663 6.5747 4.10813 7.88 4.17584C7.82353 3.92137 7.79523 3.66107 7.79565 3.39996C7.79565 2.9534 7.88054 2.51121 8.04548 2.09865C8.21041 1.68609 8.45215 1.31124 8.7569 0.995511C9.06165 0.679784 9.42344 0.429363 9.82159 0.258552C10.2197 0.0877414 10.6465 -0.00011384 11.0774 4.51813e-06C11.5265 -0.000754465 11.9709 0.0941183 12.3832 0.278738C12.7954 0.463357 13.1667 0.733786 13.4739 1.07325C14.2088 0.922489 14.9136 0.643368 15.5583 0.247815C15.3131 1.03559 14.8001 1.70424 14.1148 2.12937C14.7654 2.04944 15.4009 1.86901 16 1.5941C15.5599 2.27755 15.005 2.87363 14.3617 3.35401V3.35401Z"></path></svg></span><span class="flex-1">Twitter</span><span class="flex items-center justify-center w-4 text-black text-opacity-40 dark:text-white"><svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.00195 6.32617V0.824219C9.00195 0.490234 8.79102 0.267578 8.45117 0.267578L2.94922 0.279297C2.62109 0.279297 2.41016 0.519531 2.41016 0.794922C2.41016 1.07031 2.65039 1.30469 2.92578 1.30469H4.66602L7.45508 1.19922L6.39453 2.13672L1.16211 7.38086C1.05664 7.48633 0.998047 7.61523 0.998047 7.73828C0.998047 8.01367 1.24414 8.27734 1.53125 8.27734C1.66602 8.27734 1.78906 8.22461 1.89453 8.11914L7.13281 2.875L8.07617 1.81445L7.96484 4.48047V6.34961C7.96484 6.61914 8.19922 6.86523 8.48633 6.86523C8.76172 6.86523 9.00195 6.63672 9.00195 6.32617Z" fill="currentColor"></path></svg></span></a></li><li class="flex items-stretch space-x-1"><a target="_blank" rel="noopener noreferrer" class="flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium  text-gray-700 dark:text-gray-200 sm:hover:bg-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200" href="https://www.youtube.com/channel/UC-esBYEUGQ6iK1wmw76f5MA"><span class="flex items-center justify-center w-4"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.734576 5.16761C0.805268 4.07928 1.68027 3.22636 2.76955 3.1724C4.34691 3.09425 6.60141 3 8.3001 3C9.99879 3 12.2533 3.09425 13.8306 3.1724C14.9199 3.22636 15.7949 4.07928 15.8656 5.16761C15.9333 6.21031 16.0001 7.49331 16.0001 8.5C16.0001 9.50669 15.9333 10.7897 15.8656 11.8324C15.7949 12.9207 14.9199 13.7736 13.8306 13.8276C12.2533 13.9058 9.99879 14 8.3001 14C6.60141 14 4.34691 13.9058 2.76955 13.8276C1.68027 13.7736 0.805268 12.9207 0.734576 11.8324C0.666848 10.7897 0.600098 9.50669 0.600098 8.5C0.600098 7.49331 0.666848 6.21031 0.734576 5.16761Z" fill="currentColor"></path><path d="M6.6499 6.30005V10.7L11.0499 8.50005L6.6499 6.30005Z" fill="currentColor" class="text-gray-50 dark:text-gray-900"></path></svg></span><span class="flex-1">YouTube</span><span class="flex items-center justify-center w-4 text-black text-opacity-40 dark:text-white"><svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.00195 6.32617V0.824219C9.00195 0.490234 8.79102 0.267578 8.45117 0.267578L2.94922 0.279297C2.62109 0.279297 2.41016 0.519531 2.41016 0.794922C2.41016 1.07031 2.65039 1.30469 2.92578 1.30469H4.66602L7.45508 1.19922L6.39453 2.13672L1.16211 7.38086C1.05664 7.48633 0.998047 7.61523 0.998047 7.73828C0.998047 8.01367 1.24414 8.27734 1.53125 8.27734C1.66602 8.27734 1.78906 8.22461 1.89453 8.11914L7.13281 2.875L8.07617 1.81445L7.96484 4.48047V6.34961C7.96484 6.61914 8.19922 6.86523 8.48633 6.86523C8.76172 6.86523 9.00195 6.63672 9.00195 6.32617Z" fill="currentColor"></path></svg></span></a></li><li class="flex items-stretch space-x-1"><a target="_blank" rel="noopener noreferrer" class="flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium  text-gray-700 dark:text-gray-200 sm:hover:bg-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200" href="https://github.com/brianlovin"><span class="flex items-center justify-center w-4"><svg viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.06478 0C3.61133 0 0 3.6722 0 8.20248C0 11.8266 2.31081 14.9013 5.51518 15.9859C5.91823 16.0618 6.06622 15.808 6.06622 15.5913C6.06622 15.3957 6.05875 14.7496 6.05528 14.0642C3.81164 14.5604 3.3382 13.0963 3.3382 13.0963C2.97134 12.1483 2.44275 11.8961 2.44275 11.8961C1.71103 11.387 2.49791 11.3975 2.49791 11.3975C3.30775 11.4552 3.73417 12.2428 3.73417 12.2428C4.45347 13.4968 5.62083 13.1343 6.08103 12.9247C6.15342 12.3947 6.36245 12.0325 6.59305 11.8278C4.80178 11.6204 2.91872 10.9171 2.91872 7.77405C2.91872 6.87851 3.23377 6.14679 3.74966 5.57235C3.66593 5.36561 3.38987 4.53148 3.8278 3.40163C3.8278 3.40163 4.50501 3.18118 6.04619 4.24243C6.68951 4.0607 7.37942 3.96953 8.06478 3.96644C8.75018 3.96953 9.44062 4.0607 10.0851 4.24243C11.6244 3.18118 12.3007 3.40163 12.3007 3.40163C12.7397 4.53148 12.4635 5.36561 12.3798 5.57235C12.8969 6.14679 13.2098 6.87851 13.2098 7.77405C13.2098 10.9245 11.3231 11.6182 9.52728 11.8213C9.81657 12.0758 10.0743 12.575 10.0743 13.3403C10.0743 14.4377 10.065 15.321 10.065 15.5913C10.065 15.8096 10.2101 16.0653 10.6189 15.9848C13.8216 14.899 16.1294 11.8254 16.1294 8.20248C16.1294 3.6722 12.5187 0 8.06478 0Z"></path></svg></span><span class="flex-1">GitHub</span><span class="flex items-center justify-center w-4 text-black text-opacity-40 dark:text-white"><svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.00195 6.32617V0.824219C9.00195 0.490234 8.79102 0.267578 8.45117 0.267578L2.94922 0.279297C2.62109 0.279297 2.41016 0.519531 2.41016 0.794922C2.41016 1.07031 2.65039 1.30469 2.92578 1.30469H4.66602L7.45508 1.19922L6.39453 2.13672L1.16211 7.38086C1.05664 7.48633 0.998047 7.61523 0.998047 7.73828C0.998047 8.01367 1.24414 8.27734 1.53125 8.27734C1.66602 8.27734 1.78906 8.22461 1.89453 8.11914L7.13281 2.875L8.07617 1.81445L7.96484 4.48047V6.34961C7.96484 6.61914 8.19922 6.86523 8.48633 6.86523C8.76172 6.86523 9.00195 6.63672 9.00195 6.32617Z" fill="currentColor"></path></svg></span></a></li><li class="flex items-stretch space-x-1"><a target="_blank" rel="noopener noreferrer" class="flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium  text-gray-700 dark:text-gray-200 sm:hover:bg-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200" href="https://figma.com/@brian"><span class="flex items-center justify-center w-4"><svg width="14" height="15" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.63338 14.8C5.25222 14.8 5.84571 14.5541 6.2833 14.1166C6.72088 13.679 6.96672 13.0855 6.96672 12.4666V10.1333H4.63338C4.01454 10.1333 3.42105 10.3791 2.98347 10.8167C2.54588 11.2543 2.30005 11.8478 2.30005 12.4666C2.30005 13.0855 2.54588 13.679 2.98347 14.1166C3.42105 14.5541 4.01454 14.8 4.63338 14.8V14.8Z" fill="currentColor"></path><path d="M2.30005 7.39998C2.30005 6.78115 2.54588 6.18765 2.98347 5.75007C3.42105 5.31248 4.01454 5.06665 4.63338 5.06665H6.96672V9.73332H4.63338C4.01454 9.73332 3.42105 9.48748 2.98347 9.0499C2.54588 8.61231 2.30005 8.01882 2.30005 7.39998V7.39998Z" fill="currentColor"></path><path d="M2.30005 2.33333C2.30005 1.71481 2.54563 1.12159 2.98282 0.684062C3.42001 0.246529 4.01304 0.000483221 4.63156 0L6.96489 0V4.66667H4.63338C4.01454 4.66667 3.42105 4.42083 2.98347 3.98325C2.54588 3.54566 2.30005 2.95217 2.30005 2.33333V2.33333Z" fill="currentColor"></path><path d="M7.3999 0H9.73323C10.3521 0 10.9456 0.245833 11.3832 0.683417C11.8207 1.121 12.0666 1.71449 12.0666 2.33333C12.0666 2.95217 11.8207 3.54566 11.3832 3.98325C10.9456 4.42083 10.3521 4.66667 9.73323 4.66667H7.3999V0Z" fill="currentColor"></path><path d="M11.9667 7.4034C11.9667 8.02224 11.7209 8.61573 11.2833 9.05332C10.8457 9.4909 10.2522 9.73673 9.63338 9.73673C9.01454 9.73673 8.42105 9.4909 7.98347 9.05332C7.54588 8.61573 7.30005 8.02224 7.30005 7.4034C7.30005 6.78456 7.54588 6.19107 7.98347 5.75349C8.42105 5.3159 9.01454 5.07007 9.63338 5.07007C10.2522 5.07007 10.8457 5.3159 11.2833 5.75349C11.7209 6.19107 11.9667 6.78456 11.9667 7.4034V7.4034Z" fill="currentColor"></path></svg></span><span class="flex-1">Figma</span><span class="flex items-center justify-center w-4 text-black text-opacity-40 dark:text-white"><svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.00195 6.32617V0.824219C9.00195 0.490234 8.79102 0.267578 8.45117 0.267578L2.94922 0.279297C2.62109 0.279297 2.41016 0.519531 2.41016 0.794922C2.41016 1.07031 2.65039 1.30469 2.92578 1.30469H4.66602L7.45508 1.19922L6.39453 2.13672L1.16211 7.38086C1.05664 7.48633 0.998047 7.61523 0.998047 7.73828C0.998047 8.01367 1.24414 8.27734 1.53125 8.27734C1.66602 8.27734 1.78906 8.22461 1.89453 8.11914L7.13281 2.875L8.07617 1.81445L7.96484 4.48047V6.34961C7.96484 6.61914 8.19922 6.86523 8.48633 6.86523C8.76172 6.86523 9.00195 6.63672 9.00195 6.32617Z" fill="currentColor"></path></svg></span></a></li></ul>

*/
