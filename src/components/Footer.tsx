import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = [
    { name: 'Terms of Service', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Contact Us', href: '#' },
  ];

  return (
    <footer className="bg-eco-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-white p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-eco-primary" />
              </div>
              <span className="text-xl font-bold">CarbonPrint</span>
            </Link>
            <p className="text-white/80 text-sm max-w-xs">
              Track your digital carbon footprint and make greener choices for a sustainable future.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Mission</h3>
            <p className="text-white/80 text-sm">
              Empowering individuals to understand and reduce their digital environmental impact 
              through awareness and actionable insights.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2024 CarbonPrint. All rights reserved.
            </p>
            <p className="text-white/60 text-sm mt-2 sm:mt-0">
              Made with 🌱 for the planet
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;