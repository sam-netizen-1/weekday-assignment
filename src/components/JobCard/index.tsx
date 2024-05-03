import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./JobCard.module.scss";
import { IJob } from "./JobCard.types";

const JobCard = ({
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
}: IJob) => {
  return (
    <Box className={styles.jobCard}>
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
        {salaryCurrencyCode === "USD" ? "$" : ""}
      </Typography>

      <Typography variant="body1" className={styles.description}>
        {jobDetailsFromCompany}
      </Typography>
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
  );
};

export default JobCard;
