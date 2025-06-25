import { useEffect, useState } from "react";
import Button from "../Components/Button";
import InputBox from "../Components/InputBox";
import { Link, useParams } from "react-router-dom";
import { useJob } from "../context/JobContext";
import { isEmpty } from "../Components/Validations";

const AddNewJob = () => {
  const { id } = useParams();

  const { jobs, applicationStatus, addJob, updateJob } = useJob();

  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const [comments, setComments] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [errors, setErrors] = useState({
    companyName: "",
    title: "",
    jobLocation: "",
    jobUrl: "",
    comments: "",
  });

  useEffect(() => {
    if (id && jobs.length > 0) {
      const editJob = jobs.find((job) => job.id === Number(id));

      if (editJob) {
        setCompanyName(editJob.companyName);
        setTitle(editJob.title);
        setJobLocation(editJob.jobLocation);
        setJobStatus(editJob.jobStatus);
        setComments(editJob.comments);
        setJobUrl(editJob.jobUrl);
      }
    }
  }, [id, jobs]);

  const validation = (value, fieldName, displayName) => {
    if (isEmpty(value)) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: `${displayName} should not be empty`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      ...(id && { id: Number(id) }), // use current id if editing
      companyName,
      title,
      jobLocation,
      jobStatus,
      comments,
      jobUrl,
    };

    try {
      if (id) {
        await updateJob(jobData);
        alert("Job updated successfully");
      } else {
        await addJob(jobData);
        alert("Job added successfully");
      }
    } catch (error) {
      console.log("Error submitting job:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mx-auto my-0">
      <div className="w-[50vw] mx-auto bg-stone-400 p-6 my-10 text-black rounded-xl shadow-xl shadow-stone-400/50">
        <h1 className="my-4 text-2xl font-bold text-center">
          {id ? "Edit Job" : "Add a new Job"}
        </h1>
        <form onSubmit={handleSubmit}>
          <InputBox
            label="Company Name:"
            id="companyName"
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value);
              validation(e.target.value, "companyName", "Company Name");
            }}
            err={errors.companyName}
            required
          />

          <InputBox
            label="Job Title:"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              validation(e.target.value, "title", "Title");
            }}
            err={errors.title}
            required
          />

          <InputBox
            label="Location:"
            id="jobLocation"
            value={jobLocation}
            onChange={(e) => {
              setJobLocation(e.target.value);
              validation(e.target.value, "jobLocation", "Location");
            }}
            err={errors.jobLocation}
            required
          />

          <InputBox
            label="Job URL:"
            id="jobUrl"
            value={jobUrl}
            onChange={(e) => {
              setJobUrl(e.target.value);
              validation(e.target.value, "jobUrl", "URL");
            }}
            err={errors.jobUrl}
            required
          />

          <div className="flex items-center space-x-4 my-4">
            <label
              htmlFor="jobStatus"
              className="text-md font-medium w-40 text-right text-lg"
            >
              Status:
            </label>
            <select
              id="jobStatus"
              value={jobStatus}
              onChange={(e) => setJobStatus(e.target.value)}
              className="p-2 text-center border border-gray-00 bg-stone-100 rounded-md "
            >
              {applicationStatus.map((jobStatus) => (
                <option
                  key={jobStatus}
                  value={jobStatus}
                  className="bborder-b-4 border-indigo-500order-b-2"
                >
                  {jobStatus}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4 my-4">
            <label
              htmlFor="jobStatus"
              className="text-md font-medium w-40 text-right text-lg"
            >
              Comments:
            </label>
            <textarea
              id="comments"
              name="comments"
              value={comments}
              onChange={(e) => {
                setComments(e.target.value);
                validation(e.target.value, "Comments");
              }}
              className="p-2 flex-1 border border-gray-300 bg-stone-100 rounded-md mr-6"
            />
          </div>
          <div className="mt-8 flex items-center gap-[10vw] justify-center">
            <Link
              to={"/"}
              className="btn btn-outline bg-stone-600 text-white rounded-xl shadow-lg shadow-stone-600/50"
            >
              Cancel
            </Link>
            <Button
              type="submit"
              className="btn btn-outline bg-stone-600 text-white rounded-xl shadow-lg shadow-stone-600/50"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewJob;
