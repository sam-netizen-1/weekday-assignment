import React, { useEffect, useState } from "react";
import JobCard from "../JobCard/";
import styles from "./JobList.module.scss";
interface Job {
  jdUid: string;
  jdLink: string;
  jobDetailsFromCompany: string;
  maxJdSalary?: number;
  minJdSalary?: number;
  salaryCurrencyCode: string;
  location: string;
  minExp?: number;
  maxExp?: number;
  jobRole: string;
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchJobs();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchJobs();
  }, [isFetching]);

  const fetchJobs = async () => {
    setIsFetching(true);
    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ limit: 10, offset }),
      }
    );
    const data = await response.json();
    setJobs((prevJobs) => [...prevJobs, ...data.jdList]);
    setOffset(offset + data.jdList.length);
    setHasMore(data.totalCount > jobs.length + data.jdList.length);
    setIsFetching(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  };

  return (
    <div className={styles["job-list"]}>
      {jobs.map((job, index) => (
        <JobCard key={job.jdUid} {...job} />
      ))}
      {isFetching && <div>Loading more...</div>}
    </div>
  );
};

export default JobList;
