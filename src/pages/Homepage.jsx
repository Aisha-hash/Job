import JobsCardList from "../Components/JobsCardList";
import { useJob } from "../context/JobContext";

const Homepage = () => {
  const { jobs, applicationStatus } = useJob();

  return (
    <>
      {applicationStatus && jobs.length > 0 ? (
        applicationStatus.map((status) => (
          <JobsCardList
            key={status}
            status={status}
            jobs={jobs.filter((job) => job.jobStatus === status)}
          />
        ))
      ) : (
        <p>Opps something went Wrong!</p>
      )}
    </>
  );
};

export default Homepage;
