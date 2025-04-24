import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { CheckCircle, Users, Award, Shield, Code, Database, Palette } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white">About Us</h1>
            <p className="text-white/90 mt-2">Learn more about our mission and team</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-6">
                ServiceSarthi was founded with a simple mission: to connect homeowners in Pune with trusted, skilled
                service professionals. We recognized the challenges people face when looking for reliable home services
                - from finding qualified professionals to ensuring fair pricing and quality work.
              </p>
              <p className="text-gray-700 mb-6">
                Our platform helps thousands of customers find the right professionals for their home service needs in
                Pune. Our commitment to quality, reliability, and customer satisfaction remains at the core of
                everything we do.
              </p>
              <p className="text-gray-700">
                Today, ServiceSarthi is a growing home service platform in Pune, with a network of verified
                professionals across multiple service categories. We continue to innovate and expand our offerings to
                better serve our customers and service providers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-700">
                  Our mission is to simplify the process of finding and booking reliable home services in Pune. We
                  strive to create a platform that:
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Connects customers with trusted professionals</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Ensures transparent pricing and quality service</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Provides opportunities for skilled professionals</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Makes home maintenance simple and stress-free</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Our Values</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Trust & Reliability</h3>
                      <p className="text-gray-700 text-sm">
                        We verify all service providers to ensure quality and reliability.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Customer Satisfaction</h3>
                      <p className="text-gray-700 text-sm">
                        We prioritize customer experience and satisfaction above all else.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Quality Service</h3>
                      <p className="text-gray-700 text-sm">
                        We maintain high standards for all services offered on our platform.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Our Team</h2>
              <p className="text-gray-700 mb-8">
                ServiceSarthi is powered by a dedicated team of professionals who are passionate about transforming the
                home services industry in Pune. Our diverse team brings together expertise in technology, customer
                service, and industry knowledge.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">Aditya Chaubey</h3>
                  <p className="text-gray-600 text-sm">Full Stack Developer</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">Atharva Chatti</h3>
                  <p className="text-gray-600 text-sm">Backend Developer</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                    <Database className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">Abhinav Biradar</h3>
                  <p className="text-gray-600 text-sm">Database Specialist</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                    <Palette className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">Abhishek Gupte</h3>
                  <p className="text-gray-600 text-sm">UI/UX Designer</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                    <Database className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">Divesh Chhoriya</h3>
                  <p className="text-gray-600 text-sm">Database Specialist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

