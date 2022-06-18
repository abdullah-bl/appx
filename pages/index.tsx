import type { NextApiRequest, NextPage } from 'next'
import Header from 'components/header'
import Layout from 'components/layout'
import { useRouter } from 'next/router'
import { withSessionSsr } from 'lib/session'
import HijriDate from 'components/hijriData'
import Card from 'components/card'
import useSummary from 'hooks/useSummary'

const Home: NextPage = () => {
	const { data, error, isValidating } = useSummary()
	console.log('SUMMARY CALLED IN INDEX')
	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	// console.log(isValidating);

	// console.log('SUMMARY DATA', toDate(30))

	return (
		<Layout title='إحصائيات عامة'>
			<Header title='إحصائيات عامة' />
			<div className='h-[90vh] overflow-scroll'>
				{/* card */}

				<h3 className='text-3xl m-3  '> #ارقام </h3>
				<div className='flex flex-wrap items-center justify-start gap-2'>
					<Card title='على رأس العمل' end={data.data.people.active} />
					<Card title='متقاعد' end={data.data.people.inactive} />
				</div>
				<div className='flex flex-wrap items-center justify-start gap-2'>
					<Card title={'فرع'} end={data.data.branches} />
					<Card title='وحدة' end={data.data.units} />
					<Card title='قسم' end={data.data.departments} />
				</div>
				<div className='flex flex-wrap items-center justify-start gap-2'>
					<Card title='ملحق' end={data.data.appends.active} />
					<Card title='إلحاق منتهي' end={data.data.appends.ended} />
					<Card title='إلحاق داخلي' end={data.data.appends.internal} />
					<Card title='إلحاق خارجي' end={data.data.appends.external} />
				</div>
				<h3 className='text-3xl m-5'> #ينتهي قريباً </h3>
				{data.data.appends.endSoon.length > 0 && (
					<>
						<TableSample data={data.data.appends.endSoon} />
					</>
				)}
			</div>
		</Layout>
	)
}

const TableSample = ({ title, data }: { title?: string; data: any }) => {
	const { push } = useRouter()
	return (
		<div className='p-2'>
			<table className='rounded'>
				<thead>
					<tr>
						<th>#</th>
						<th>الاسم</th>
						<th>الرقم</th>
						<th>الفرع /الوحدة /القسم</th>
						<th>تاريخ البداية</th>
						<th>تاريخ الإنتهاء</th>
					</tr>
				</thead>
				<tbody className='table-latest'>
					{data.map((d: any) => (
						<tr
							className='cursor-pointer hover:bg-gray-50'
							key={d.id}
							onClick={() => push(`/data/${d.id}`)}
						>
							<td>{d.id}</td>
							<td>{d?.employee?.name}</td>
							<td>{d?.employee?.no}</td>
							<td>
								{d?.branch.name} / {d?.unit?.name} {'/' + d?.department?.name}
							</td>
							<td>
								<HijriDate data={d.start} />
							</td>
							<td>
								<HijriDate data={d.end} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Home

export const getServerSideProps = withSessionSsr(
	async function getServerSideProps({ req }) {
		if (!req.session.user) {
			return {
				redirect: {
					destination: '/login',
					permanent: false,
				},
			}
		}

		return {
			props: {
				user: req.session.user,
			},
		}
	}
)
