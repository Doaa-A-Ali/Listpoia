import React from "react";
function WhiteFooter() {
    return (
      <footer className="bg-emerald-600 text-white py-6 px-4 sm:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li className="text-orange-700">
                Connect with us:
                <div className="text-white mt-1">
                  <p>Email: listopia@gmail.com</p>
                  <p>Phone: +963 987654321</p>
                </div>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:underline text-white"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
  
          {/* Social Media Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-[#FF8C42] transition duration-300"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-white hover:text-[#FF8C42] transition duration-300"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-white hover:text-[#FF8C42] transition duration-300"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
  
          {/* Newsletter Signup */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Subscribe to Our Newsletter</h4>
            <form className="flex flex-col sm:flex-row sm:items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:flex-1 px-4 py-2 rounded-md text-gray-800 mb-2 sm:mb-0 sm:mr-2"
              />
              <button
                type="submit"
                className="bg-[#FF8C42] text-white px-4 py-2 rounded-md hover:bg-[#FF6E20] transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
  
        {/* Footer Bottom */}
        <div className="mt-8 border-t border-white/20 pt-4 text-center text-sm text-white/80">
          © {new Date().getFullYear()} <span className="text-[#FF4842]">Listopia</span>. All rights reserved.
        </div>
      </footer>
    );
  }
  
  export default WhiteFooter;