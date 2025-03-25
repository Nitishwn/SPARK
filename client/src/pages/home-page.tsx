import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Clock, Leaf, CreditCard, 
  CheckCircle, Zap 
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                The Future of 
                <span className="text-primary ml-2">Smart Parking</span>
                <span className="block mt-2">Is Here</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                SPARK integrates IoT, AI, and ADAS technologies to revolutionize urban parking. Find, navigate to, and pay for parking spots—all within one seamless experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/booking">
                  <Button size="lg">Book a Spot</Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline">How It Works</Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center z-30 relative" style={{ zIndex: 30 - i }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Trusted by <span className="font-semibold">10,000+</span> drivers daily</p>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <div className="relative">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                    alt="Smart parking visualization with AR overlay" 
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent rounded-xl"></div>
                  <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-md">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium">Nearest Spot Found</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2 min away • $2.50/hr</p>
                      </div>
                      <div className="ml-auto">
                        <Button size="sm">Navigate</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-xs font-medium">AI-Assisted Parking</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 flex items-center">
                  <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mr-2">
                    <Zap className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-xs font-medium">Real-time Updates</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Why Choose SPARK Section */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose SPARK?</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our integrated solution addresses the most critical urban parking challenges through cutting-edge technology.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-full flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Save Time</h3>
                  <p className="text-gray-600 dark:text-gray-400">Reduce time spent searching for parking spots by up to 70% with our intelligent spot detection system.</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                    <Leaf className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Reduce Emissions</h3>
                  <p className="text-gray-600 dark:text-gray-400">Minimize driving time and idle emissions with direct routing to available parking spaces.</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mb-4">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Seamless Payments</h3>
                  <p className="text-gray-600 dark:text-gray-400">Handle parking fees digitally with secure, contactless payment options and automatic receipts.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
