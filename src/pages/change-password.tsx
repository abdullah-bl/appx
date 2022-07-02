import Header from '~/components/Header'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Button from '~/components/Button'
import Label from '~/components/Label'
import Input from '~/components/Input'
import Link from 'next/link'
import { User } from '@prisma/client'

export default function ChangePassword({
	user,
	selectedUser,
}: {
	user: User
	selectedUser: User | null
}) {
	const { push } = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		defaultValues: {
			username: user?.username,
			oldPassword: '',
			newPassword: '',
		},
	})

	useEffect(() => {
		// if user not admin, change his password
		// if user is admin, and not passing query,
		// add his username to default values
		// or if user is admin, and passing query,
		// change password of the user
		if (user?.admin && selectedUser?.username) {
			return setValue('username', selectedUser?.username)
		}
		if ((user?.admin && !selectedUser?.username) || !user?.admin) {
			return setValue('username', user?.username)
		}
		return () => {}
	}, [selectedUser?.username, setValue, user?.admin, user?.username])

	const onSubmit = async (data: any) => {
		const res = await fetch('/api/change-password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: data.username,
				oldPassword: data.oldPassword,
				newPassword: data.newPassword,
			}),
		})
		const json = await res.json()
		if (json.status === 'success') {
			toast.success('تم تغيير كلمة المرور بنجاح')
			return push('/')
		} else {
			console.log(json.message)
			toast.error(json.message)
		}
		console.log(json)
	}
	return (
		<>
			<Header title='تغيير كلمة المرور' />
			<div className='flex flex-col items-center justify-center h-[92vh] overflow-hidden'>
				<div className='flex flex-col items-center rounded border-2 border-blue-500 p-5 min-w-[400px]'>
					<h2 className='font-bold text-xl m-4'> تغيير كلمة المرور </h2>
					<form className='w-full' onSubmit={handleSubmit(onSubmit)}>
						<div>
							<Label htmlFor='username'>اسم المستخدم</Label>
							<Input
								id='username'
								type='text'
								disabled
								placeholder='اسم المستخدم'
								{...register('username', {
									disabled: true,
									value: user?.username,
									required: 'اسم المستخدم مطلوب',
								})}
							/>
							{/* {errors.username && (
								<span className='text-red-500'>{errors.username.message}</span>
							)} */}
							<Label htmlFor='oldPassword'>كلمة المرور القديمة</Label>
							<Input
								id='oldPassword'
								type='password'
								placeholder='كلمة المرور القديمة'
								{...register('oldPassword', {
									required: 'كلمة المرور القديمة مطلوبة',
									deps: ['oldPassword'],
								})}
							/>
							{errors.oldPassword && (
								<span className='text-red-500'>
									{errors.oldPassword.message}
								</span>
							)}
						</div>
						<div>
							<Label htmlFor='password'> كلمة المرور الجديدة</Label>
							<Input
								type='password'
								id='password'
								placeholder='كلمة المرور الجديدة'
								{...register('newPassword', {
									min: {
										value: 4,
										message: 'كلمة المرور يجب ان تكون على الاقل 4 حروف',
									},
									required: 'كلمة المرور مطلوبة',
								})}
							/>
							{errors.newPassword && (
								<span className='text-red-500'>
									{errors.newPassword.message}
								</span>
							)}
						</div>

						<div className='flex items-center justify-center'>
							<Button>تغيير كلمة المرور</Button>
						</div>
						<div className='flex items-center justify-center'>
							<Link href={'/'} passHref>
								<a>العودة للصفحة الرئيسية</a>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
