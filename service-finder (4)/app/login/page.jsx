import Link from "next/link"
import LoginForm from "@/components/LoginForm"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image/Brand */}
      <div className="hidden md:flex md:w-1/2 bg-gray-900 p-12 text-white justify-center items-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold font-heading mb-6">Welcome Back to ServiceSarthi</h1>
          <p className="text-lg mb-8 text-white/90">
            Connect with trusted professionals for all your home service needs. Login to access your account and manage
            your bookings.
          </p>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-white/10 p-2 rounded-full mr-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lg">Book Services Easily</h3>
                <p className="text-white/80">Schedule appointments with top-rated professionals</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-white/10 p-2 rounded-full mr-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lg">Track Your History</h3>
                <p className="text-white/80">View past services and upcoming appointments</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-white/10 p-2 rounded-full mr-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lg">Save Your Favorites</h3>
                <p className="text-white/80">Keep track of your preferred service providers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex flex-col p-6 md:p-12 justify-center">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-black">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        <div className="max-w-md w-full mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-heading">Sign In</h2>
            <p className="text-muted-foreground mt-2">Enter your credentials to access your account</p>
          </div>

          <LoginForm />

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-gray-900 font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

