import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IssueItem {
  _id: string;
  email: string;
  phone: string;
  issue: string;
  is_resolved: boolean;
}

const IssueList: React.FC = () => {
  const [issues, setIssues] = useState<IssueItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get<{ issues: IssueItem[] }>(
          "http://localhost:5000/api/v1/issues/all"
        );
        setIssues(response.data.issues);
      } catch (err) {
        setError(`Failed to fetch issues.${err}`);
      }
    };

    fetchIssues();
  }, []);

  const handleChangeStatus = async (_id: string, newStatus: boolean) => {
    try {
      await axios.put(`http://localhost:5000/api/v1/issues/update/${_id}`, {
        is_resolved: newStatus,
      });
      toast.success("Issue status updated successfully!");
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue._id === _id ? { ...issue, is_resolved: newStatus } : issue
        )
      );
    } catch (err) {
      setError(`Failed to update issue status.",${err}`);
      toast.error("Failed to update issue status.");
    }
  };
  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Issues List</h1>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {issues.length === 0 ? (
              <p className="text-center text-gray-500">No issues found.</p>
            ) : (
              issues.map((issue) => (
                <div
                  key={issue._id}
                  className="bg-white shadow-md rounded-lg p-4 flex flex-col"
                >
                  <p className="text-gray-600">Email: {issue.email}</p>
                  <p className="text-gray-600">Phone Number: {issue.phone}</p>
                  <p className="text-gray-600">Issue: {issue.issue}</p>
               
               {issue?.is_resolved?(
                  <p className="text-green-600">
                    Resolved: {issue.is_resolved ? "Yes" : "No"}
                  </p>):(
                     <p className="text-red-600">
                     Resolved: {issue.is_resolved ? "Yes" : "No"}
                   </p>
                  )}
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">
                      Change Status:
                    </label>
                    {!issue.is_resolved && (
                      <select
                        value={issue.is_resolved ? "true" : "false"}
                        onChange={(e) =>
                          handleChangeStatus(
                            issue._id,
                            e.target.value === "true"
                          )
                        }
                        className="border rounded-md p-2"
                      >
                        <option value="false">Not Resolved</option>
                        <option value="true">Resolved</option>
                      </select>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default IssueList;
