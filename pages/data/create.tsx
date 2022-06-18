import { Employee } from '@prisma/client'
import Button from 'components/button'
import Centered from 'components/centered'
import Header from 'components/header'
import Input from 'components/input'
import Label from 'components/label'
import Layout from 'components/layout'
import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import useSWR from 'swr/immutable'

type FormData = {
	employeeId: string
	start: Date | string
	end: Date | string
	note?: string | null
	internal?: boolean
	branchId: number | null
	unitId?: number | null
	departmentId?: number | null
}

const CreateData: NextPage = () => {
	const { data: Employees, error } = useSWR('/api/employees')
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			employeeId: '',
			start: '',
			end: '',
			note: '',
			internal: false,
			branchId: null,
			unitId: null,
			departmentId: null,
		},
	})

	const onSubmit = (data: FormData) => {
		console.log(data)
	}

	return (
		<Layout>
			<Header title='إنشاء جديد' />
			<Centered>
				<div className='flex flex-col items-center border-2 min-w-[400px] min-h-[400px] p-2 rounded-xl'>
					<h1 className='text-3xl m-2'>Hello</h1>
					<form className='flex-1 w-full p-4' onSubmit={handleSubmit(onSubmit)}>
						<div className='mt-4'>
							<Label htmlFor='employeeId'>اسم المستخدم</Label>
							<Select
								options={
									Employees &&
									Employees.map((e: Employee) => ({
										label: `${e.name} - ${e.no}`,
										value: e.id,
									}))
								}
								onChange={(e: any) => setValue('employeeId', e?.value)}
							/>
						</div>
						<div>
							<Label htmlFor='password'>كلمة المرور</Label>

							<Input
								type='password'
								id='password'
								placeholder='كلمة المرور'
								{...register('departmentId', {
									required: 'كلمة المرور مطلوبة',
								})}
							/>
							{errors.departmentId && (
								<span className='text-red-500 font-bold'>
									{errors.departmentId.message}
								</span>
							)}
						</div>

						<div className='flex justify-center items-center'>
							<Button type='submit'>تسجيل الدخول</Button>
						</div>
					</form>
				</div>
			</Centered>
		</Layout>
	)
}

export default CreateData
