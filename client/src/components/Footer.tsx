import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Send,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                SP
              </div>
              <span className="ml-2 text-xl font-bold">SPARK</span>
            </div>
            <p className="text-gray-300 dark:text-gray-400 text-sm mb-6">
              Revolutionizing urban parking through smart technology and seamless user experiences.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link href="/features" className="text-gray-300 hover:text-white">Features</Link></li>
              <li><Link href="/how-it-works" className="text-gray-300 hover:text-white">How It Works</Link></li>
              <li><Link href="/booking" className="text-gray-300 hover:text-white">Booking</Link></li>
              <li><Link href="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white">About</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">User Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">API Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Integration Partners</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">City Implementation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Press Kit</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
            <p className="text-gray-300 dark:text-gray-400 text-sm mb-4">
              Stay updated with our latest news and updates
            </p>
            <form className="flex mb-4">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-700 dark:bg-gray-900 border-gray-600 dark:border-gray-800 rounded-r-none focus:ring-primary"
              />
              <Button type="submit" className="rounded-l-none">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-gray-400">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} SPARK Parking Technologies. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
