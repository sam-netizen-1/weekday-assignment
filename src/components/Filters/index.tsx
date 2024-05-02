import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import styles from "./Filters.module.scss";

interface FiltersProps {
  onFilterChange: any;
  // onFilterChange: (filterName: string, value: string | number) => void;
}

const roles = ["Backend Engineer", "Frontend Engineer", "Product Manager"];
const experiences = ["<1 year", "1-3 years", "3-5 years", "5+ years"];
const remoteOptions = ["Remote", "In-office", "Hybrid"];

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  return (
    <Box className={styles.filtersBar}>
      <TextField
        select
        label="Role"
        defaultValue=""
        onChange={(event) => onFilterChange("role", event.target.value)}
        className={styles.filterItem}
      >
        {roles.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Experience"
        defaultValue=""
        onChange={(event) => onFilterChange("experience", event.target.value)}
        className={styles.filterItem}
      >
        {experiences.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Work Type"
        defaultValue=""
        onChange={(event) => onFilterChange("remote", event.target.value)}
        className={styles.filterItem}
      >
        {remoteOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default Filters;
