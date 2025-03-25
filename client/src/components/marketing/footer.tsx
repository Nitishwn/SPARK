import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-primary text-2xl font-bold">SPARK</span>
              <span className="ml-2 text-gray-400">Smart Parking</span>
            </div>
            <p className="text-gray-400 mb-4">
              Revolutionizing urban parking with AI and IoT technology.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon="facebook" />
              <SocialLink icon="twitter" />
              <SocialLink icon="linkedin" />
              <SocialLink icon="instagram" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <FooterLink href="/#features" label="Features" />
              <FooterLink href="/#how-it-works" label="How It Works" />
              <FooterLink href="/#pricing" label="Pricing" />
              <FooterLink href="/#" label="API" />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <FooterLink href="/#" label="Documentation" />
              <FooterLink href="/#" label="Blog" />
              <FooterLink href="/#" label="Case Studies" />
              <FooterLink href="/#" label="Support" />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <i className="mr-2">📧</i>
                <a href="mailto:info@sparkparking.com" className="hover:text-white">
                  info@sparkparking.com
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <i className="mr-2">📞</i>
                <a href="tel:+18005551234" className="hover:text-white">
                  +1 (800) 555-1234
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <i className="mr-2">📍</i>
                <span>123 Tech Ave, San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} SPARK Smart Parking. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <FooterLink href="/#" label="Privacy Policy" />
            <FooterLink href="/#" label="Terms of Service" />
            <FooterLink href="/#" label="Cookies" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ icon }: { icon: string }) {
  const getIcon = () => {
    switch (icon) {
      case "facebook":
        return <i className="fa-brands fa-facebook"></i>;
      case "twitter":
        return <i className="fa-brands fa-twitter"></i>;
      case "linkedin":
        return <i className="fa-brands fa-linkedin"></i>;
      case "instagram":
        return <i className="fa-brands fa-instagram"></i>;
      default:
        return null;
    }
  };

  return (
    <a href="#" className="text-gray-400 hover:text-primary">
      {getIcon()}
    </a>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="text-gray-400 hover:text-white">
        {label}
      </Link>
    </li>
  );
}
