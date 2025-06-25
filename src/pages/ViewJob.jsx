import { CircleXIcon, ExternalLink, FilePenLine, Trash2 } from "lucide-react";
import Button from "../Components/Button";
import { useParams, Link } from "react-router-dom";
import { useJob } from "../context/JobContext";

const ViewJob = () => {
  const { id } = useParams();

  const { jobs } = useJob();

  const job = jobs.find((job) => job.id === Number(id));

  const handleEdit = () => {
    console.log("Edit");
  };

  return (
    <div className="mx-auto my-0">
      <div className="outline w-[50vw] mx-auto bg-stone-400 p-2 my-10 text-black rounded-xl shadow-xl shadow-stone-400/50 h-[60vh] flex flex-col relative">
        <div className="absolute top-1 right-2 rounded-full p-1 cursor-pointer hover:fill-red-400">
          <Link to={"/"}>
            <CircleXIcon className="hover:fill-red-400 transition-colors duration-200 ease-in" />
          </Link>
        </div>
        <h2 className="my-4 text-2xl font-bold text-center">
          {job.jobUrl ? (
            <a
              href={job.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              {job.title}
              <ExternalLink size={16} />
            </a>
          ) : (
            <span>{job.title}</span>
          )}
        </h2>

        {job.companyName && (
          <div className="font-semibold text-center text-xl">
            {job.companyName}
          </div>
        )}
        {job.jobLocation && (
          <div className="font-semibold text-center text-md m-2">
            -{job.jobLocation}
          </div>
        )}

        {job.comments && (
          <div className="m-4 text-left pl-10 font-semibold">
            Additional Comments:{" "}
            <span className="italic font-normal">{job.comments}</span>
          </div>
        )}

        {/* Button sticks to bottom */}
        <div className="mt-auto flex justify-center gap-[5vh] mb-4">
          <Link to={`/editJob/${job.id}`}>
            <Button
              className="btn-md text-base transition delay-150 duration-400 ease-out bg-stone-600 text-white hover:bg-stone-200 hover:text-black hover:border-black"
              onClick={handleEdit}
            >
              <FilePenLine size={18} />
              Edit
            </Button>
          </Link>
          <Button
            className="btn-md text-base transition delay-150 duration-400 ease-out bg-stone-600 text-white hover:bg-stone-200 hover:text-black hover:border-black"
            onClick={handleEdit}
          >
            <Trash2 size={18} /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewJob;
