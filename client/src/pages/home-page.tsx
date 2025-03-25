import React from 'react';
import { Link } from 'wouter';
import { Navbar } from '@/components/marketing/navbar';
import { Footer } from '@/components/marketing/footer';
import { StatCard } from '@/components/marketing/stats-card';
import { FeatureCard } from '@/components/marketing/feature-card';
import { HowItWorksStep } from '@/components/marketing/how-it-works-step';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { 
  Search, 
  Route, 
  Smartphone, 
  BarChart, 
  CreditCard, 
  Shield,
  Car
} from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="bg-white dark:bg-gray-900 py-12 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-10 lg:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  ADAS-Enabled <span className="text-primary">Smart Parking</span> Solution
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  SPARK connects directly to your vehicle's ADAS. Drive in, receive instant spot recommendations, tap to confirm, and let your vehicle navigate you directly to your spot.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button size="lg" asChild>
                    <Link href={user ? "/dashboard" : "/auth"}>
                      View Dashboard
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="#how-it-works">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2 lg:pl-10">
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-blue-100 dark:bg-blue-900/20">
                  <div className="p-8 min-h-[300px] flex flex-col items-center justify-center">
                    <div className="flex justify-center mb-4 relative">
                      <Car className="h-24 w-24 text-primary" />
                      <div className="absolute -right-4 -top-2 bg-green-100 dark:bg-green-900/50 rounded-full p-2">
                        <Route className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="absolute -left-4 -top-2 bg-amber-100 dark:bg-amber-900/50 rounded-full p-2">
                        <Smartphone className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2">ADAS-Enabled Parking</h3>
                    <p className="text-center">Your vehicle automatically connects, receives spot recommendations, and navigates</p>
                    <div className="mt-6 flex space-x-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-white">
                        <Car className="h-3 w-3 mr-1" /> ADAS Integration
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                        <Route className="h-3 w-3 mr-1" /> Auto-Navigation
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
              <StatCard value="30%" label="Reduction in urban congestion" />
              <StatCard value="15 min" label="Average time saved per parking" />
              <StatCard value="99.8%" label="Parking spot detection accuracy" />
              <StatCard value="50+" label="Cities implementing SPARK" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Smart Features for Smart Cities</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our comprehensive solution integrates cutting-edge technology to make parking effortless for drivers and manageable for operators.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={Search} 
                title="Real-time Spot Detection" 
                description="IoT sensors and cameras detect available spots instantly, updating the system in real-time."
                iconColor="text-primary"
                iconBgColor="bg-blue-100 dark:bg-blue-900/20"
              />
              
              <FeatureCard 
                icon={Route} 
                title="Intelligent ADAS Integration" 
                description="When you enter the facility, our system connects with your vehicle's ADAS, instantly suggesting available spots with single-tap confirmation and automated navigation guidance."
                iconColor="text-green-500"
                iconBgColor="bg-green-100 dark:bg-green-900/20"
              />
              
              <FeatureCard 
                icon={Smartphone} 
                title="Mobile Integration" 
                description="Book, pay, and navigate to your spot from our intuitive mobile app – available for iOS and Android."
                iconColor="text-purple-500"
                iconBgColor="bg-purple-100 dark:bg-purple-900/20"
              />
              
              <FeatureCard 
                icon={BarChart} 
                title="Predictive Analytics" 
                description="AI algorithms predict parking availability based on historical data, events, and traffic patterns."
                iconColor="text-yellow-500"
                iconBgColor="bg-yellow-100 dark:bg-yellow-900/20"
              />
              
              <FeatureCard 
                icon={CreditCard} 
                title="Secure Payments" 
                description="Contactless payment options with encrypted transactions and digital receipts."
                iconColor="text-red-500"
                iconBgColor="bg-red-100 dark:bg-red-900/20"
              />
              
              <FeatureCard 
                icon={Shield} 
                title="Enhanced Security" 
                description="Security cameras, license plate recognition, and automated alerts ensure vehicle safety."
                iconColor="text-indigo-500"
                iconBgColor="bg-indigo-100 dark:bg-indigo-900/20"
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How SPARK Works</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our seamless integration of IoT, AI, and ADAS technologies creates a frictionless parking experience.
              </p>
            </div>
            
            <div className="relative">
              {/* Process Steps */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"></div>
              
              <div className="space-y-12 relative">
                <HowItWorksStep 
                  number={1}
                  title="Detection"
                  description="IoT sensors and cameras throughout parking facilities continuously monitor spot availability and transmit data to our cloud platform."
                  icon={Search}
                  iconColor="text-blue-600 dark:text-blue-400"
                />
                
                <HowItWorksStep 
                  number={2}
                  title="Processing"
                  description="Our AI algorithms process the collected data to create real-time maps, predict availability, and optimize parking allocations."
                  icon={BarChart}
                  iconColor="text-green-600 dark:text-green-400"
                  iconBgColor="bg-green-100 dark:bg-green-900/20"
                  isReversed={true}
                />
                
                <HowItWorksStep 
                  number={3}
                  title="ADAS Integration"
                  description="As you enter the parking facility, your vehicle's ADAS connects to our system and receives real-time spot availability. Accept the recommendation with a single tap for automated navigation to your spot."
                  icon={Route}
                  iconColor="text-amber-600 dark:text-amber-400"
                  iconBgColor="bg-amber-100 dark:bg-amber-900/20"
                />
                
                <HowItWorksStep 
                  number={4}
                  title="Monitoring & Management"
                  description="Facility managers use our dashboard to monitor occupancy, analyze usage patterns, and optimize parking operations."
                  icon={Smartphone}
                  iconColor="text-purple-600 dark:text-purple-400"
                  iconBgColor="bg-purple-100 dark:bg-purple-900/20"
                  isReversed={true}
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary bg-opacity-10 dark:bg-opacity-5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Experience ADAS-Enabled Smart Parking</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Connect your vehicle's ADAS to SPARK and discover effortless parking with automated spot recommendations and navigation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href={user ? "/dashboard" : "/auth"}>
                  <Car className="mr-2 h-5 w-5" /> Connect Your Vehicle
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#how-it-works">
                  <Route className="mr-2 h-5 w-5" /> See How It Works
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
