import moments from 'moment-hijri'
import 'moment/locale/ar-sa'

moments.defineLocale('ar-sa', null)

const HijriDate = ({ data }: { data: string }) => {
	return (
		<span>
			{moments(data).format(`iYYYY/iM/iD الموافق YYYY/MM/DD`)}
			<small className='mx-3'>({moments(data).fromNow()})</small>
		</span>
	)
}

export default HijriDate
