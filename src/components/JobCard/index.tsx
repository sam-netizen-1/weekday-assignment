import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./JobCard.module.scss";

interface JobProps {
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

const JobCard: React.FC<JobProps> = ({
  jdLink,
  jobDetailsFromCompany,
  maxJdSalary,
  minJdSalary,
  salaryCurrencyCode,
  location,
  minExp,
  maxExp,
  jobRole,
}) => {
  return (
    <Box className={styles.jobCard}>
      <Box className={styles.header}>
        <Typography variant="h6" component="h2">
          {jobRole}
        </Typography>
        <Typography variant="body1">{location}</Typography>
      </Box>
      <Typography variant="body1" className={styles.salary}>
        Salary: {minJdSalary} - {maxJdSalary} {salaryCurrencyCode}
      </Typography>
      <Typography variant="body1" className={styles.experience}>
        Experience: {minExp} - {maxExp} {minExp || maxExp ? "years" : ""}
      </Typography>
      <Typography variant="body1" className={styles.description}>
        {jobDetailsFromCompany}
      </Typography>
      <Box className={styles.applyButton}>
        <Button variant="contained" fullWidth>
          Easy Apply
        </Button>
      </Box>
    </Box>
  );
};

export default JobCard;
