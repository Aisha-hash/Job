import { ExternalLink, FilePenLine, Trash2 } from "lucide-react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useJob } from "../context/JobContext";

const JobCard = ({ job }) => {
  const { deleteJob } = useJob();
  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      alert("Job deleted!");
    } catch (err) {
      console.log(id);

      alert("Error deleting job: " + err.message);
    }
  };

  return (
    <div className="bg-white rounded-md p-2 mx-1 my-2">
      <div className="font-semibold">
        {job.companyName}: <span className="font-normal">{job.title}</span>
      </div>
      <div>5 mins ago</div>
      <div className="flex justify-evenly mt-3">
        <Link to={`/job/${job.id}`}>
          <Button className=" btn-sm  bg-black text-white p-2">
            <ExternalLink size={14} />
            View
          </Button>
        </Link>
        <Link to={`/editJob/${job.id}`}>
          <Button className="btn-sm  bg-black text-white">
            <FilePenLine size={14} />
            Edit
          </Button>
        </Link>
        <Button
          className=" btn-sm  bg-black text-white"
          onClick={() => handleDelete(job.id)}
        >
          <Trash2 size={14} /> Delete
        </Button>
      </div>
    </div>
  );
};
export default JobCard;
