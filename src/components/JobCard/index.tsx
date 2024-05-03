import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./JobCard.module.scss";
import { IJob } from "./JobCard.types";
import { useState } from "react";
import React from "react";
interface IJobProps extends IJob {
  isExpanded: boolean;
  setExpandedJobId: (id: string | null) => void;
  expandedJobId: string | null;
}
const JobCard = (
  {
    jdUid,
    jdLink,
    jobDetailsFromCompany,
    maxJdSalary,
    minJdSalary,
    salaryCurrencyCode,
    location,
    minExp,
    maxExp,
    jobRole,
    companyName,
    logoUrl,
    isExpanded,
    setExpandedJobId,
    expandedJobId,
  }: IJobProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const handleViewMore = () => {
    if (isExpanded) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(jdUid);
    }
  };
  return (
    <Box
      className={styles.jobCard}
      style={{ filter: expandedJobId && !isExpanded ? "blur(4px)" : "none" }}
      ref={ref}
      onClick={() => {
        expandedJobId && handleViewMore();
      }}
    >
      <Box className={styles.header}>
        <img src={logoUrl} className={styles.logo} />
        <Box className={styles.content}>
          <Typography className={styles.companyName}>{companyName}</Typography>
          <Typography className={styles.jobRole}>{jobRole}</Typography>
          <Typography className={styles.location}>{location}</Typography>
        </Box>
      </Box>
      <Typography variant="body1" className={styles.salary}>
        Estimated Salary: {minJdSalary ? minJdSalary + "K -" : ""}{" "}
        {maxJdSalary ? maxJdSalary + "K" : ""}{" "}
        {salaryCurrencyCode === "USD" ? "$ ✅" : ""}
      </Typography>

      <div
        className={styles.description}
        style={{
          overflow: isExpanded ? "visible" : "hidden",
          textOverflow: isExpanded ? "clip" : "ellipsis",
          WebkitLineClamp: isExpanded ? "none" : 7,
          display: isExpanded ? "block" : "-webkit-box",
          WebkitBoxOrient: isExpanded ? "unset" : "vertical",
        }}
      >
        <p className={styles.aboutCompany}>About Company:</p>
        <p className={styles.aboutUs}>About us</p>
        {jobDetailsFromCompany}
      </div>
      <Box className={styles.buttonContainer}>
        <Button className={styles.viewButton} onClick={handleViewMore}>
          {isExpanded ? "View Less" : "View More"}
        </Button>
        <Typography variant="body1" className={styles.experience}>
          Experience: {minExp ? minExp + " -" : ""} {maxExp}{" "}
          {minExp || maxExp ? "years" : "Not Mentioned"}
        </Typography>
        <Box className={styles.applyButton}>
          <a href={jdLink} target="_blank">
            <Button variant="contained" fullWidth>
              ⚡ Easy Apply
            </Button>
          </a>
        </Box>
        <Box className={styles.referralButton}>
          <Button variant="contained" fullWidth>
            👥 Unlock referral asks
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default React.forwardRef(JobCard);
