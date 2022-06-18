import '../styles/globals.css'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { SWRConfig } from 'swr'
import { ThemeProvider } from 'next-themes'

export function reportWebVitals(metric: NextWebVitalsMetric) {
	// console.log(metric)
}

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig
			value={{
				// provider: () => new Map(),
				fetcher: (url, config) => fetch(url, config).then((res) => res.json()),
			}}
		>
			<ThemeProvider attribute='class'>
				<Toaster />
				<Component {...pageProps} />
			</ThemeProvider>
		</SWRConfig>
	)
}

export default MyApp
