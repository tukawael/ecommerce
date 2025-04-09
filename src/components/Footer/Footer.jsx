import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">

        {/* Column 1 - Branding & Description */}
        <div>
          <h2 className="text-2xl font-bold text-white">FreshCart</h2>
          <p className="text-gray-400 mt-2">
            Your one-stop shop for fresh groceries. Order now and get your essentials delivered fast!
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li className="hover:text-green-400 cursor-pointer">About Us</li>
            <li className="hover:text-green-400 cursor-pointer">Contact</li>
            <li className="hover:text-green-400 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-green-400 cursor-pointer">Terms of Service</li>
          </ul>
        </div>

        {/* Column 3 - Contact & Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white">Stay Connected</h3>
          
          {/* Email Input */}
          <div className="flex mt-3">
            <input 
              type="email" 
              className="w-full p-2 rounded-l-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-green-400 outline-none text-white" 
              placeholder="Enter your email"
            />
            <button className="bg-green-500 px-4 py-2 rounded-r-md text-white hover:bg-green-600 transition">
              Subscribe
            </button>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4 mt-4">
            <i className="fab fa-facebook-f text-xl hover:text-green-400 cursor-pointer"></i>
            <i className="fab fa-twitter text-xl hover:text-green-400 cursor-pointer"></i>
            <i className="fab fa-instagram text-xl hover:text-green-400 cursor-pointer"></i>
            <i className="fab fa-linkedin-in text-xl hover:text-green-400 cursor-pointer"></i>
          </div>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} FreshCart. All Rights Reserved.
      </div>
    </footer>
  );
}
