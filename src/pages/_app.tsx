import '../styles/globals.css'

import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'next-themes'
import { withTRPC } from '@trpc/next'
import superjson from 'superjson'

import type { AppRouter } from '~/backend/routes'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { AppType } from 'next/dist/shared/lib/utils'

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
	// console.log(metric)
}

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<ThemeProvider attribute='class' defaultTheme='light'>
			<Component {...pageProps} />
			<Toaster />
		</ThemeProvider>
	)
}

export default withTRPC<AppRouter>({
	config({ ctx }) {
		// console.log('ctx =>', ctx)
		/**
		 * If you want to use SSR, you need to use the server's full URL
		 * @link https://trpc.io/docs/ssr
		 */
		const url = process.env.VERCEL_URL
			? `https://${process.env.VERCEL_URL}/api/trpc`
			: 'http://localhost:3000/api/trpc'

		return {
			headers() {
				return {
					Authorization: '',
				}
			},
			transformer: superjson,
			url,
			/**
			 * @link https://react-query.tanstack.com/reference/QueryClient
			 */
			// queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
		}
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 */
	ssr: true,
})(MyApp)
