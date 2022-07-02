import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import Label from '~/components/Label'
import Input from '~/components/Input'
import Button from '~/components/Button'
import { trpc } from '~/utils/trpc'
import jsCookies from 'js-cookie'

const LoginPage: NextPage = () => {
	const { push } = useRouter()
	const loginMutation = trpc.useMutation('auth.login', {
		onError: (error) => {
			toast.error(error.message)
			console.log(error)
		},
		onSuccess: (data) => {
			toast.success('Login successful')
			jsCookies.set('token', data.token)
			return push('/')
		},
	})

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
		const { username, password } = data
		await loginMutation.mutateAsync({ username, password })
		// if (response.success) {
		// toast.dismiss()
		// toast.success('مرحباً, ' + response.user?.name)
		// return push('/')
		// }
		// if (!response.success) {
		// 	toast.dismiss()
		// 	toast.error(response.message)
		// }
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
