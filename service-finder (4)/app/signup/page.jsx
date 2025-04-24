import Link from "next/link"
import SignupForm from "@/components/SignupForm"
import { ArrowLeft } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col p-6 md:p-12 justify-center">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-black">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        <div className="max-w-md w-full mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-heading">Create an Account</h2>
            <p className="text-muted-foreground mt-2">Join ServiceSarthi to access premium services</p>
          </div>

          <SignupForm />

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-gray-900 font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image/Brand */}
      <div className="hidden md:flex md:w-1/2 bg-gray-900 p-12 text-white justify-center items-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold font-heading mb-6">Join ServiceSarthi Today</h1>
          <p className="text-lg mb-8 text-white/90">
            Create an account to enjoy all the benefits of our platform and connect with top-rated service
            professionals.
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
                <h3 className="font-medium text-lg">Verified Professionals</h3>
                <p className="text-white/80">All service providers are vetted and verified</p>
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
                <h3 className="font-medium text-lg">Secure Payments</h3>
                <p className="text-white/80">Safe and secure payment processing</p>
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
                <h3 className="font-medium text-lg">Satisfaction Guarantee</h3>
                <p className="text-white/80">We ensure quality service or your money back</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

