import JobCard from "./JobCard";

const JobsCardList = ({ status, jobs }) => {
  return (
    <div className="bg-stone-200 rounded-lg p-2 overflow-y-auto flex-1 m-2">
      <div className="font-semibold text-center mb-2">{status}</div>

      {/* Render each job card */}
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs available</p>
      ) : (
        jobs.map((job) => <JobCard key={job.id} job={job} />)
      )}
    </div>
  );
};

export default JobsCardList;
