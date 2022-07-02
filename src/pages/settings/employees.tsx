import Button from '~/components/Button'
import Header from '~/components/Header'
import { PageLayout } from '~/components/Layouts'
import { NextPage } from 'next'
import { useState, useRef } from 'react'
import XLSX from 'xlsx'

const Employees: NextPage = () => {
	const [data, setData] = useState(null)
	const ref = useRef<HTMLInputElement>(null)

	const handleFileChanged = () => {
		const file = ref.current?.files?.[0]
		if (file) {
			var workbook = XLSX.read(file)
			var sheet_name_list = workbook.SheetNames
			console.log(sheet_name_list)
		}
		console.log(file)
	}

	return (
		<PageLayout>
			<Header title='الموظفين'>
				<div className='flex items-center'>
					<Button
						className='bg-red-700'
						onClick={() => {
							if (ref.current) {
								ref.current.click()
							}
						}}
					>
						تحميل الملف
						<input
							ref={ref}
							type='file'
							hidden
							onChange={handleFileChanged}
							accept='.xlsx,.xls,.csv'
						/>
					</Button>
					<Button>
						<a href='/api/employees/download'>تحميل الملف</a>
					</Button>
					<Button>
						<a href='/api/employees/download'>تحميل الملف</a>
					</Button>
				</div>
			</Header>
			{/* <div className='overflow-scroll' dangerouslySetInnerHTML={data} /> */}
		</PageLayout>
	)
}

export default Employees
