import React from "react";
import { BookingForm } from "@/components/booking/BookingForm";
import { BookingHistory } from "@/components/booking/BookingHistory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CreditCard, 
  Smartphone, 
  WalletCards, 
  Receipt, 
  Clock 
} from "lucide-react";

export default function BookingPage() {
  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold mb-4">Booking & Payments</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Effortlessly reserve parking spots in advance or find them on-demand, with seamless payment processing.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <div>
            <BookingForm />
          </div>
          
          {/* Payment Info and History */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-green-500" />
                  Flexible Payment Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Choose from multiple payment methods for your convenience. All transactions are secured with enterprise-grade encryption.
                </p>
                <div className="grid grid-cols-4 gap-2">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                    <svg className="h-10 w-10 text-blue-800 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.112 8.262L7.25 15.75H5.249L4.087 9.993C3.905 9.181 3.752 8.915 3.217 8.662C2.861 8.481 2.286 8.312 1.785 8.205L1.828 8.077H5.047C5.554 8.077 6.023 8.425 6.134 9.016L6.636 12.893L7.904 8.077H9.903M17.139 12.668C17.15 10.507 14.498 10.407 14.521 9.517C14.528 9.219 14.816 8.902 15.438 8.834C15.746 8.8 16.602 8.777 17.584 9.266L17.9 7.619C17.336 7.39 16.644 7.17 15.803 7.17C13.894 7.17 12.573 8.182 12.559 9.681C12.543 10.779 13.491 11.398 14.213 11.771C14.955 12.152 15.225 12.394 15.221 12.729C15.214 13.243 14.573 13.466 13.975 13.475C12.95 13.491 12.358 13.187 11.897 12.963L11.571 14.67C12.033 14.891 12.903 15.088 13.802 15.099C15.814 15.099 17.123 14.1 17.139 12.519V12.668M22.517 15.75H24L22.625 8.077H20.993C20.54 8.077 20.153 8.34 19.984 8.753L17.25 15.75H19.249L19.62 14.741H22.242L22.432 15.75H22.517ZM20.128 13.156L21.1 10.482L21.699 13.156H20.128ZM11.736 8.077L10.161 15.75H8.25L9.827 8.077H11.736Z" />
                    </svg>
                  </div>
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                    <svg className="h-10 w-10 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.5 9.644A6.786 6.786 0 0 0 19.136 9a6.786 6.786 0 0 0-2.365.644 6.786 6.786 0 0 0-2.365-.644 6.786 6.786 0 0 0-2.365.644A6.786 6.786 0 0 0 9.676 9a6.786 6.786 0 0 0-2.365.644A6.786 6.786 0 0 0 4.946 9a6.786 6.786 0 0 0-2.364.644V6.5A5 5 0 0 1 7.5 1.5h9A5 5 0 0 1 21.5 6.5v3.144Z" />
                      <path d="M2.582 14.361v2.14A6.753 6.753 0 0 1 4.946 16a6.753 6.753 0 0 1 2.365.5 6.753 6.753 0 0 1 2.365-.5 6.753 6.753 0 0 1 2.365.5 6.753 6.753 0 0 1 2.365-.5 6.753 6.753 0 0 1 2.365.5 6.753 6.753 0 0 1 2.365-.5 6.753 6.753 0 0 1 2.364.5v-2.14a7.5 7.5 0 0 0-2.364-.36 7.5 7.5 0 0 0-2.365.36 7.5 7.5 0 0 0-2.365-.36 7.5 7.5 0 0 0-2.365.36 7.5 7.5 0 0 0-2.365-.36 7.5 7.5 0 0 0-2.365.36 7.5 7.5 0 0 0-2.364-.36 7.5 7.5 0 0 0-2.364.36Z" />
                      <path d="M2.582 11.644v2.14A6.783 6.783 0 0 1 4.946 13.3a6.783 6.783 0 0 1 2.365.484 6.783 6.783 0 0 1 2.365-.484 6.783 6.783 0 0 1 2.365.484 6.783 6.783 0 0 1 2.365-.484 6.783 6.783 0 0 1 2.365.484 6.783 6.783 0 0 1 2.365-.484 6.783 6.783 0 0 1 2.364.484v-2.14a7.5 7.5 0 0 0-2.364-.36 7.5 7.5 0 0 0-2.365.36 7.5 7.5 0 0 0-2.365-.36 7.5 7.5 0 0 0-2.365.36 7.5 7.5 0 0 0-2.365-.36 7.5 7.5 0 0 0-2.365.36 7.5 7.5 0 0 0-2.364-.36 7.5 7.5 0 0 0-2.364.36Z" />
                      <path d="M2.582 17.078v2.14A6.753 6.753 0 0 1 4.946 18.7a6.753 6.753 0 0 1 2.365.5 6.753 6.753 0 0 1 2.365-.5 6.753 6.753 0 0 1 2.365.5 6.753 6.753 0 0 1 2.365-.5 6.753 6.753 0 0 1 2.365.5 6.753 6.753 0 0 1 2.365-.5 6.753 6.753 0 0 1 2.364.5v-2.14a7.5 7.5 0 0 0-2.364-.36 7.5 7.5 0 0 0-2.365.36 7.5 7.5 0 0 0-2.365-.36 7.5 7.5 0 0 0-2.365.36 7.5 7.5 0 0 0-2.365-.36 7.5 7.5 0 0 0-2.365.36 7.5 7.5 0 0 0-2.364-.36 7.5 7.5 0 0 0-2.364.36Z" />
                      <path d="M2.582 19.8V22.5H21.5v-2.7a7.5 7.5 0 0 0-2.364-.36 7.5 7.5 0 0 0-2.365.36 7.5 7.5 0 0 0-2.365-.36 7.5 7.5 0 0 0-2.365.36 7.5 7.5 0 0 0-2.365-.36 7.5 7.5 0 0 0-2.365.36 7.5 7.5 0 0 0-2.364-.36 7.5 7.5 0 0 0-2.364.36Z" />
                    </svg>
                  </div>
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                    <svg className="h-10 w-10 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2ZM3 7h9v10H3V7Zm18 10h-7V7h7v10Z" />
                      <path d="M19 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                    </svg>
                  </div>
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                    <svg className="h-10 w-10 text-blue-700 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.997 20.759S8.645 22 6.75 22c-2.754 0-5.25-2.307-5.25-5.155 0-3.954 3.36-7.663 7.126-10.029C9.978 5.775 12 4 14.496 4c3.04 0 4.004 2.607 4.004 4.714 0 3.405-2.762 5.733-5.512 5.733-1.323 0-2.165-.783-2.165-.783s-.3 1.177-.423 1.694c-.275 1.187-1.145 2.648-1.761 3.544-.11.159-.143.194-.642.857ZM17.047 2C14.7 2 12.709 3.653 11.25 5.117c-3.013 2.336-5.215 5.113-5.215 7.68 0 1.615 1.034 2.95 2.965 2.95 1.96 0 3.329-1.334 4.083-3.192 0 0 .39-1.064.488-1.314.327-.681.654-.995 1.185-.995.713 0 1.296.577 1.296 1.307 0 1.275-1.2 2.72-1.2 2.72-.327.331-.078.737.405.737.422 0 .859-.173 1.136-.346C18.42 13.5 20 11.184 20 8.682 20 5.167 18.377 2 17.047 2Z" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <WalletCards className="mr-2 h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Payment Process</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-xs">1</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Book your spot through the app</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-xs">2</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Save payment method securely</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-xs">3</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Auto-charges based on actual usage</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-xs">4</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Receipts emailed automatically</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Smartphone className="mr-2 h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Mobile Experience</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-xs">1</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Reserve spots ahead of time</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-xs">2</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Extend parking time remotely</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-xs">3</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Get reminder notifications</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-xs">4</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Navigate to your exact spot</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <BookingHistory />
          </div>
        </div>
        
        {/* Pricing Information */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-10">Parking Pricing Options</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Hourly Parking</span>
                  <Clock className="h-5 w-5 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">$2.50<span className="text-lg font-normal text-gray-500">/hour</span></div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Flexible duration</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Pay as you go</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">No minimum stay</span>
                  </li>
                </ul>
                <p className="text-xs text-gray-500 mb-4">
                  Perfect for quick visits to downtown areas or shopping centers.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex justify-between items-center">
                  <span>Daily Parking</span>
                  <Receipt className="h-5 w-5 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">$15.00<span className="text-lg font-normal text-gray-500">/day</span></div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">24-hour access</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">In/out privileges</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Guaranteed spot</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">40% savings vs. hourly</span>
                  </li>
                </ul>
                <p className="text-xs text-gray-500 mb-4">
                  Ideal for full-day visits, tourists, and business travelers.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Monthly Pass</span>
                  <CreditCard className="h-5 w-5 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">$199<span className="text-lg font-normal text-gray-500">/month</span></div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Unlimited parking</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Reserved spot option</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Priority access</span>
                  </li>
                </ul>
                <p className="text-xs text-gray-500 mb-4">
                  Best value for commuters and frequent users. Saves over 60% compared to daily rates.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
