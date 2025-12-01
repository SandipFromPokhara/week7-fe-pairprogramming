import { useEffect, useState } from "react";
import JobListings from "../components/JobListings";

const Home = () => {
  const [jobs, setJobs] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        if (!res.ok) {
          throw new Error("Couldn't fetch the data");
        }
        const data = await res.json();
        setIsPending(false);
        setJobs(data);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    };
    fetchJobs();}, []);

  return (
    <div className="home">
      <p>Welcome to HomePage</p>
      <button onClick={() => alert("Please register and login to add job!")}>Add-Job</button>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {jobs && <JobListings jobs={jobs}/>}
    </div>
  );
};

export default Home;
