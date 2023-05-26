import './globals.css'

import { Be_Vietnam_Pro } from 'next/font/google'
import Provider from '@/components/provider/Provider'


const BVP = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight:'400'
})

export const metadata = {
  title: 'Đăng nhập',
  description: 'Login page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={BVP.className}>
        <Provider>
          {children}
        </Provider>
        </body>
    </html>
  )
}
