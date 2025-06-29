import { useJob } from "../context/JobContext";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ViewGraph = () => {
  const { jobs, applicationStatus } = useJob();
  const statusSet = new Set(applicationStatus);

  const counts = {
    "To Apply": 0,
    Applied: 0,
    "Interview Scheduled": 0,
    Rejected: 0,
  };

  jobs.forEach((job) => {
    if (statusSet.has(job.jobStatus)) {
      counts[job.jobStatus]++;
    }
  });

  console.log(counts.Applied);
  const chartData = Object.entries(counts).map(([status, count]) => ({
    name: status,
    y: count,
  }));

  const options = {
    chart: {
      type: "column", // or 'column', 'bar', etc.
    },
    title: {
      text: "Job Status Distribution",
    },
    credits: {
      enabled: false,
    },

    series: [
      {
        name: "My jobs data",
        data: chartData,
      },
    ],
    xAxis: {
      categories: Array.from(statusSet),
    },
    yAxis: {
      title: { text: "No. of Applications" },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ViewGraph;
