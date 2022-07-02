import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '~/components/Button'

const NoFound = () => {
	const { back, pathname, push, query } = useRouter()
	return (
		<div className='w-screen h-screen flex items-center flex-col justify-center gap-2'>
			<Image
				alt='Not Found'
				src='/notfound.svg'
				width={280}
				height={280}
				objectFit='contain'
			/>
			<h3>عذراً</h3>
			<h4>الصفحة غير موجودة</h4>
			<Button onClick={back}> العودة للخلف </Button>
			<Link href={'/'} passHref>
				<a>الصفحة الرئيسية</a>
			</Link>
		</div>
	)
}

export default NoFound
