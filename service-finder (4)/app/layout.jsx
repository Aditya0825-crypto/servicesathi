import ClientLayout from "./ClientLayout"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="ServiceSarthi - Find and book local services in Pune" />
        <title>ServiceSarthi - Local Service Finder</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <ClientLayout>{children}</ClientLayout>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
