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
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = async () => {
    if (!hasMore) return;
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
    setJobs([...jobs, ...data.jdList]);
    setOffset(offset + data.jdList.length);
    // setHasMore(data.totalCount > jobs.length + data.jdList.length);
    setHasMore(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    fetchJobs();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset, jobs]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    fetchJobs();
  };

  return (
    <div className={styles["job-list"]}>
      {jobs.map((job) => (
        <JobCard key={job.jdUid} {...job} />
      ))}
    </div>
  );
};

export default JobList;
