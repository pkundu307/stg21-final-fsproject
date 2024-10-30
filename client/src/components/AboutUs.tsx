import React from "react";

const About = () => {
  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-4">About Us</h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to lootlo , your go-to destination for quality products and
          unbeatable prices. We’re dedicated to offering a seamless shopping
          experience with a curated selection across categories like fashion,
          electronics, home essentials, and more. Our mission is to bring value,
          convenience, and top-notch customer service to every shopper, every
          time. Happy shopping!
        </p>
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-gray-600 mb-4">
          Our mission is to empower customers with a seamless, personalized
          shopping experience that combines quality products, innovation, and
          exceptional service. We strive to connect people with the brands they
          love, creating value and convenience at every step. Through integrity
          and customer-centricity, we aim to be the go-to platform for all
          e-commerce needs, fostering trust and satisfaction.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Integrity</li>
          <li>Innovation</li>
          <li>Customer Satisfaction</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
      </div>
    </div>
  );
};

export default About;
