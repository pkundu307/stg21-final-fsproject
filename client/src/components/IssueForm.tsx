import React, { useState } from "react";
import Navbar from "./Navbar";
import { baseUrl } from "../utils/baseUrl";

const Issue = () => {
  const [issue, setIssue] = useState({
    email: "",
    phone: "",
    issue: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setIssue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the issue data as a JSON object
    const issueData = {
      email: issue.email,
      phone: issue.phone,
      issue: issue.issue,
    };

    console.log(issueData); // Optional: for debugging

    try {
      const response = await fetch(`${baseUrl}/api/v1/issues/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issueData), // Send as JSON
      });

      if (response.ok) {
        console.log("Issue submitted successfully");
        // You can display a success message or reset the form
      } else {
        console.log("Failed to submit the issue");
        // Handle the failure scenario (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle errors (e.g., show a network error message)
    }
  };

  return (
    <>
      <Navbar />
      <div id="issues">
        <section className="bg-gray-900">
          <form
            className="w-1/3 mx-auto flex flex-col justify-center align-center"
            onSubmit={handleSubmit}
          >
            <h2 className="block mb-5 text-4xl font-medium text-blue-700">
              Give Me Your Details To Resolve Your Issues
            </h2>

            <div className="mb-4 input-box">
              <label className="block mb-4 text-xl font-medium text-gray-900 dark:text-blue-700">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={issue.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your Email"
                required
              />
            </div>

            <div className="mb-4 input-box">
              <label className="block mb-4 text-xl font-medium text-gray-900 dark:text-blue-700">
                Phone:
              </label>
              <input
                type="text"
                name="phone"
                value={issue.phone}
                onChange={handleChange}
                className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Phone number"
                maxLength={10}
                minLength={10}
                pattern="[1-9]{1}[0-9]{9}"
                required
              />
            </div>

            <div className="input-box">
              <label className="block mb-4 text-xl font-medium text-gray-900 dark:text-blue-700">
                Write Your Issues:
              </label>
              <textarea
                name="issue"
                value={issue.issue}
                onChange={handleChange}
                className="text-white mb-4 w-full bg-gray-700 rounded border border-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-900 h-32 text-base outline-none py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                minLength={20}
                maxLength={100}
                required
              />
            </div>

            <button
              type="submit"
              className="py-3 mb-2 text-gray-200 bg-gray-700 hover:bg-grey-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-green-900 dark:focus:ring-gray-800"
            >
              Send Your Issues
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default Issue;
