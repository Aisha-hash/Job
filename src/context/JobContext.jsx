import { createContext, useContext, useEffect, useState } from "react";

// Create the context
const JobContext = createContext();

// Custom hook to use the context
export const useJob = () => useContext(JobContext);

// Context Provider component
export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  // Application status options
  const applicationStatus = [
    "To Apply",
    "Applied",
    "Interview Scheduled",
    "Offer",
  ];

  // Fetch all jobs from server
  const fetchApplications = async () => {
    try {
      const response = await fetch("http://localhost:3001/applications");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to fetch applications");
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching applications:", error.message);
      // Optional: Show notification or set error state here
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Add a new job
  const addJob = async (jobData) => {
    try {
      const response = await fetch("http://localhost:3001/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to add job");
      }

      const newJob = await response.json();
      setJobs((prev) => [...prev, newJob]);
      return newJob;
    } catch (error) {
      console.error("Error adding job:", error.message);
      throw error;
    }
  };

  // Update an existing job
  const updateJob = async (jobData) => {
    try {
      const response = await fetch(
        `http://localhost:3001/applications/${jobData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jobData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to update job");
      }

      const updatedJob = await response.json();
      setJobs((prev) =>
        prev.map((job) => (job.id === updatedJob.id ? updatedJob : job))
      );
      return updatedJob;
    } catch (error) {
      console.error("Error updating job:", error.message);
      throw error;
    }
  };

  // Delete a job
  const deleteJob = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/applications/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to delete job");
      }

      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Error deleting job:", error.message);
      throw error;
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        setJobs,
        applicationStatus,
        addJob,
        updateJob,
        deleteJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
