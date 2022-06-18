import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { withSessionSsr } from 'lib/session'
import Label from 'components/label'
import Input from 'components/input'
import Button from 'components/button'
import useUser from 'hooks/useUser'

const LoginPage: NextPage = () => {
	const { push } = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: '',
			password: '',
		},
	})

	const onSubmit = async (data: any) => {
		const res = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		const json = await res.json()
		if (json.status === 'success') {
			toast.dismiss()
			toast.success('مرحباً, ' + json.data?.name)
			return push('/')
		} else {
			toast.dismiss()
			toast.error(json.message)
		}
	}
	return (
		<div className='flex flex-1 justify-center items-center h-screen flex-col bg-orange-200'>
			<div className=' min-w-[380px]  border-2 border-solid border-blue-600 rounded-md bg-white flex flex-col p-5'>
				<h1 className='text-center m-4 text-2xl font-bold'>تسجيل الدخول</h1>
				<span className='text-center -mt-4'>برنامج ادارة الملحقين</span>

				<form className='flex-1' onSubmit={handleSubmit(onSubmit)}>
					<div className='mt-4'>
						<Label htmlFor='username'>اسم المستخدم</Label>
						<Input
							id='username'
							placeholder='اسم المستخدم'
							{...register('username', {
								required: 'اسم المستخدم مطلوب',
							})}
						/>
						{errors.username && (
							<span className='text-red-500 font-bold'>
								{errors.username.message}
							</span>
						)}
					</div>
					<div>
						<Label htmlFor='password'>كلمة المرور</Label>

						<Input
							type='password'
							id='password'
							placeholder='كلمة المرور'
							{...register('password', {
								required: 'كلمة المرور مطلوبة',
							})}
						/>
						{errors.password && (
							<span className='text-red-500 font-bold'>
								{errors.password.message}
							</span>
						)}
					</div>

					<div className='flex justify-center items-center'>
						<Button type='submit'>تسجيل الدخول</Button>
					</div>
				</form>
				<h3 className='text-center'>ادارة الاتصالات و تقنية المعلومات</h3>
			</div>
		</div>
	)
}

export default LoginPage

export const getServerSideProps = withSessionSsr(
	async function getServerSideProps({ req }) {
		if (req.session.user) {
			return {
				redirect: {
					destination: '/',
				},
				props: {},
			}
		}
		return {
			props: {},
		}
	}
)
