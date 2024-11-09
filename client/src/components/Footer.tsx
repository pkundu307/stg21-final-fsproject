import React from 'react';
import { Link } from 'react-router-dom';
import Issue from './IssueForm';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  const handleSubscribe = () => {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const token = localStorage.getItem("jwtToken");

    fetch("http://localhost:3000/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        alert("Subscribed successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to subscribe. Please try again later.");
      });
  };

  return (
    <footer className="relative bg-gray-600 text-black py-8">
      {/* SVG Wave Shape */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-20"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,
               250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,
               3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#ffffff"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
       
        <div className="bg-blue-400 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-4">Subscribe to our Newsletter</h3>
          <div className="flex items-center">
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-l-lg border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={handleSubscribe}
              className="bg-blue-700 text-white p-2 rounded-r-lg hover:bg-blue-800 transition duration-200"
            >
              Subscribe
            </button>
          </div>
        </div>

        <div className="bg-green-400 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-4">Useful Links</h3>
          <ul className="space-y-2">
            <li><a href="#about" className="hover:underline text-white">About Us</a></li>
            <li><a href="#privacy" className="hover:underline text-white">Privacy Policy</a></li>
            <li><a href="#refund" className="hover:underline text-white">Cancellation & Refund</a></li>
            <li><a href="/Issue" className="hover:underline text-white">Raise an Issue</a></li>
            <li><a href="#career" className="hover:underline text-white">Career</a></li>
          </ul>
        </div>

        <div className="bg-purple-400 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-2xl hover:text-blue-400 transition duration-200" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-2xl hover:text-blue-400 transition duration-200" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-2xl hover:text-pink-500 transition duration-200" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-2xl hover:text-gray-500 transition duration-200" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
