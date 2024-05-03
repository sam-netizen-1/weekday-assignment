import React, { useEffect, useState, useRef } from "react";
import JobCard from "../JobCard/";
import styles from "./JobList.module.scss";
import { IJob } from "../JobCard/JobCard.types";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { JobsState, fetchJobs, setFetching } from "../../redux/JobsSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { selectFilteredJobs, throttle } from "./JobList.helper";

const JobList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isFetching, hasMore } = useSelector((state: RootState) => state.jobs);
  const jobs = useSelector(selectFilteredJobs);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const jobRefs = useRef([]);
  const handleFetch = () => {
    if (isFetching || !hasMore) {
      return;
    }
    dispatch(setFetching(true));
    dispatch(fetchJobs());
  };
  const handleScroll = throttle(() => {
    const bottomOffset = 200;
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const pageHeight = document.documentElement.offsetHeight;
    const distanceToBottom = pageHeight - scrollPosition;
    if (distanceToBottom < bottomOffset && hasMore && !isFetching) {
      handleFetch();
    }
  }, 100);

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

  useEffect(() => {
    handleFetch();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    jobRefs.current = jobs.map(
      (_: IJob, i: number) => jobRefs.current[i] || React.createRef()
    );
  }, [jobs]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expandedJobId]);

  return (
    <Box>
      <Box className={styles["job-list"]}>
        {jobs.map((job: IJob, index: number) => (
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
