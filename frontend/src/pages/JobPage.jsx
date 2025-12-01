import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const JobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const deleteJob = async (id) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        console.log("id: ", id);
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) {
          throw new Error("Network error");
        }
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleDelete = (jobId) => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;

    deleteJob(jobId);
    navigate("/");
  };

  return (
    <div className="job-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{job.title}</h2>
          <p>Type: {job.type}</p>
          <p>Description: {job.description}</p>
          <p>Company: {job.company.name}</p>
          <p>Email: {job.company.contactEmail}</p>
          <p>Phone: {job.company.contactPhone}</p>
          <button onClick={() => handleDelete(job._id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default JobPage;
