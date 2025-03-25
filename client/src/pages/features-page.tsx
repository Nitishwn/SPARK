import React from "react";
import { 
  Radar, Car, Smartphone, 
  BarChart3, ArrowRight 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl font-bold mb-4">Powerful Features</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the innovative technologies that make SPARK the most advanced parking solution available.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <Radar className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Real-time Spot Detection</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our IoT sensors and cameras detect parking spot availability in real-time, providing accurate information with 99.5% accuracy.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <Car className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Autonomous Navigation</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      For vehicles with ADAS capabilities, SPARK can guide autonomous or semi-autonomous parking with centimeter precision.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <Smartphone className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Mobile-Guided Parking</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Turn-by-turn directions guide you to your spot, including AR overlay to visualize the exact location in complex garages.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <BarChart3 className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Predictive Analytics</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our AI predicts parking availability trends, allowing you to plan trips during optimal times.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button className="flex items-center">
                  Try in the Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Card className="p-4">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1581299683008-95463d0a7499?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                    alt="Smart parking app interface" 
                    className="w-full h-auto"
                  />
                </div>
                <CardContent className="p-2 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-medium">Downtown Garage</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">32 spots available</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm rounded-full">Open Now</span>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-4">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <span>65% Full</span>
                    <span>Updated 2 min ago</span>
                  </div>
                  <Button className="w-full">
                    Reserve a Spot
                  </Button>
                </CardContent>
              </Card>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 h-24 w-24 bg-blue-50 dark:bg-blue-900/20 rounded-full z-0"></div>
              <div className="absolute -bottom-6 -left-6 h-32 w-32 bg-green-50 dark:bg-green-900/20 rounded-full z-0"></div>
            </div>
          </div>
          
          {/* Additional Features */}
          <div className="mt-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Additional Features</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                SPARK offers a comprehensive set of features to make parking hassle-free.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Custom Alerts",
                  description: "Set reminders when your parking time is about to expire or when spots become available.",
                  icon: <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-10a1 1 0 10-2 0v3.586l-1.707 1.707a1 1 0 001.414 1.414l2-2a1 1 0 00.293-.707V8z" clipRule="evenodd" />
                    </svg>
                  </div>
                },
                {
                  title: "Rate Comparison",
                  description: "Compare parking rates across different locations to find the best deal for your needs.",
                  icon: <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                },
                {
                  title: "Vehicle Recognition",
                  description: "Automatic license plate recognition for seamless entry and exit without tickets or cards.",
                  icon: <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1.172a2 2 0 01-1.414-.586l-.828-.828A2 2 0 0010.172 2H9.828a2 2 0 00-1.414.586l-.828.828A2 2 0 016.172 4H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                },
                {
                  title: "EV Charging Integration",
                  description: "Find and reserve spots with EV charging capabilities and monitor charging status.",
                  icon: <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                },
                {
                  title: "Family Sharing",
                  description: "Share parking access and payment methods with family members under one account.",
                  icon: <div className="h-10 w-10 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                },
                {
                  title: "Business Accounts",
                  description: "Manage corporate parking needs with expense tracking and multiple vehicle support.",
                  icon: <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                  </div>
                }
              ].map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    {feature.icon}
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
