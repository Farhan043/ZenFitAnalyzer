import { FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Logo and Description */}
        <div>
          <h2 className="text-3xl flex items-center font-bold text-blue-400"><span><img src="/public/logo.gif" alt="" /></span>ZenFitAnalyzer</h2>
          <p className="mt-3 ml-2 text-gray-400">Your ultimate fitness companion to track and improve health, workouts, and lifestyle.</p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-300">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="/home" className="text-gray-400 hover:text-white transition">Home</a></li>
            <li><a href="/meal" className="text-gray-400 hover:text-white transition">Meal</a></li>
            <li><a href="/workout" className="text-gray-400 hover:text-white transition">Workout</a></li>
            <li><a href="/contact" className="text-gray-400 hover:text-white transition">Contact</a></li>
          </ul>
        </div>
        
        {/* Resources */}   
        <div>
          <h3 className="text-lg font-semibold text-gray-300">Legal</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="policy" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
            <li><a href="terms" className="text-gray-400 hover:text-white transition">Terms of use</a></li>
        
          </ul>
        </div>
        
        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-300">Get In Touch</h3>
          <p className="mt-3 flex items-center cursor-pointer hover:text-blue-600 justify-center md:justify-start text-gray-400">
          <a href="mailto:supp0rt.zenfitanalyzer@gmail.com">supp0rt@zenfitanalyzergmail.com</a>
          </p>
          <div className="mt-5 flex justify-center md:justify-start space-x-5">
            <a href="#" className="text-gray-400 hover:text-white text-2xl transition"><FaFacebook /></a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl transition"><FaInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl transition"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl transition"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="mt-12 text-center text-gray-500 text-sm border-t border-gray-700 pt-6">
        &copy; 2025 ZenFitAnalyzer. All rights reserved.
      </div>
    </footer>
  );
}
