import React from "react";
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
    <div className={styles.jobCard}>
      <div className={styles.header}>
        <h2>{jobRole}</h2>
        <p>{location}</p>
      </div>
      <div className={styles.salary}>
        <p>
          Salary: {minJdSalary} - {maxJdSalary} {salaryCurrencyCode}
        </p>
      </div>
      <div className={styles.experience}>
        <p>
          Experience: {minExp} - {maxExp} {minExp || maxExp ? "years" : ""}
        </p>
      </div>
      <div className={styles.description}>
        <p>{jobDetailsFromCompany}</p>
      </div>
      <div className={styles.applyButton}>
        <button>Easy Apply</button>
      </div>
    </div>
  );
};

export default JobCard;
