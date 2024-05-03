import React, { BaseSyntheticEvent, useEffect, useState, useRef } from "react";
import JobCard from "../JobCard/";
import styles from "./JobList.module.scss";
import { IJob } from "../JobCard/JobCard.types";
import { Box } from "@mui/material";

const JobList = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const jobRefs = useRef([]);

  useEffect(() => {
    jobRefs.current = jobs.map(
      (_, i) => jobRefs.current[i] || React.createRef()
    );
  }, [jobs]);

  const handleClickOutside = (event: any) => {
    if (expandedJobId) {
      const isOutside = !jobRefs.current.some(
        (ref: React.RefObject<HTMLDivElement>) =>
          ref.current?.contains(event.target)
      );
      if (isOutside) {
        setExpandedJobId(null);
      }
    }
  };

  const fetchJobs = async (initialFetch = false) => {
    if (!hasMore || (initialFetch && isFetching)) return;
    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ limit: 10, offset }),
      }
    );
    const data = await response.json();
    setJobs((prevJobs) => [...prevJobs, ...data.jdList]);
    setOffset((prevOffset) => prevOffset + data.jdList.length);
    setHasMore(data.totalCount > jobs.length + data.jdList.length);
    setIsFetching(false);
  };

  useEffect(() => {
    if (!isFetching) return;
    fetchJobs();
  }, [isFetching]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expandedJobId]);

  const handleScroll = () => {
    const bottomOffset = 200;
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const pageHeight = document.documentElement.offsetHeight;
    const distanceToBottom = pageHeight - scrollPosition;

    if (distanceToBottom < bottomOffset && !isFetching) {
      setIsFetching(true);
    }
  };
  useEffect(() => {
    fetchJobs(true);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box>
      <Box className={styles["job-list"]}>
        {jobs.map((job, index) => (
          <JobCard
            key={job.jdUid}
            ref={jobRefs.current[index]}
            {...job}
            isExpanded={job.jdUid === expandedJobId}
            setExpandedJobId={setExpandedJobId}
            expandedJobId={expandedJobId}
          />
        ))}
      </Box>
      {isFetching && <div>Loading more...</div>}
    </Box>
  );
};

export default JobList;
