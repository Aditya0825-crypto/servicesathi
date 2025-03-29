import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider, ProvidersProvider } from "@/lib/auth-context"
import { ToastProvider } from "@/components/ui/toast"
import ChatBot from "@/components/ChatBot"
import ScrollToTop from "@/components/ScrollToTop"
import PageTransition from "@/components/PageTransition"

export const metadata = {
  title: "ServiceSarthi - Find Local Services in Pune",
  description:
    "Find and book trusted local services like plumbing, electrical work, carpentry, and house cleaning in Pune.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ProvidersProvider>
            <AuthProvider>
              <ToastProvider>
                <PageTransition>{children}</PageTransition>
                <ChatBot />
                <ScrollToTop />
              </ToastProvider>
            </AuthProvider>
          </ProvidersProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'