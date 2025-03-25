import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl font-bold mb-4">How SPARK Works</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our integrated system combines IoT, AI, and ADAS technologies to create a seamless parking experience.
            </p>
          </div>
          
          <div className="relative">
            {/* Connection lines */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0"></div>
            
            {/* Steps */}
            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  step: 1,
                  title: "Detection",
                  description: "IoT sensors detect vehicle presence and communicate spot availability to the central system."
                },
                {
                  step: 2,
                  title: "Processing",
                  description: "AI algorithms process parking data in real-time, optimizing allocations and predicting future availability."
                },
                {
                  step: 3,
                  title: "Navigation",
                  description: "ADAS integration provides precise guidance to the parking spot through the mobile app or vehicle system."
                },
                {
                  step: 4,
                  title: "Payment",
                  description: "Automated payment processing charges users only for actual parking time, with multiple payment options."
                }
              ].map((step) => (
                <div key={step.step} className="flex flex-col items-center text-center relative">
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 border-4 border-primary rounded-full flex items-center justify-center mb-4 z-10">
                    <span className="text-xl font-bold">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-24">
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-4">Technology Integration</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    SPARK's power comes from seamlessly integrating multiple advanced technologies into one cohesive system.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-full flex items-center justify-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13 7H7v6h6V7z" />
                          <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">IoT Sensors</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Low-power devices provide 24/7 monitoring of each parking spot.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">AI & Machine Learning</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Algorithms that learn and adapt to optimize parking allocation.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">ADAS Integration</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Connect with advanced driver assistance systems for precise parking guidance.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">Secure Cloud Platform</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Enterprise-grade security for all data and payment transactions.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 md:p-0 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80" 
                    alt="SPARK technology integration visualization" 
                    className="max-w-full h-auto mix-blend-overlay"
                  />
                </div>
              </div>
            </Card>
          </div>
          
          {/* System Architecture Section */}
          <div className="mt-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">System Architecture</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Understanding how all components of SPARK work together to provide a seamless parking experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Edge Layer</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-xs">1</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Ultrasonic sensors for spot detection</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-xs">2</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">CCTV cameras with computer vision</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-xs">3</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Bluetooth beacons for proximity</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-xs">4</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Local gateways for data aggregation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Cloud Platform</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-xs">1</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Scalable data processing pipelines</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-xs">2</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">ML models for occupancy prediction</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-xs">3</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">API services for client applications</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-xs">4</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Secure payment processing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Client Layer</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-xs">1</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Mobile apps for iOS and Android</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-xs">2</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Web dashboard for management</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-xs">3</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Vehicle integration via ADAS</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-xs">4</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">AR navigation overlays</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Experience SPARK?</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Join thousands of drivers who are already saving time and reducing stress with our smart parking solution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/booking">
                <Button size="lg">Book a Spot Now</Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline">View Live Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
