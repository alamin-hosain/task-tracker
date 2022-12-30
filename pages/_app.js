import Layout from '../components/Layout/Layout'
import '../styles/globals.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from '../contexts/AuthProvider'
import { ThemeProvider } from 'next-themes'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class'>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
