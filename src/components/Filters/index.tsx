import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import styles from "./Filters.module.scss";
import { Select } from "@mui/material";

interface FiltersProps {
  onFilterChange: any;
  // onFilterChange: (filterName: string, value: string | number) => void;
}

const roles = ["frontend", "ios", "android", "tech lead", "backend"];
const experiences = ["<1 year", "1-3 years", "3-5 years", "5+ years"];
const locations = ["remote", "delhi ncr", "mumbai", "chennai", "bangalore"];

const Filters = ({ onFilterChange }: FiltersProps) => {
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
      <Select
        multiple
        label="Experience"
        defaultValue={[]}
        onChange={(event) => onFilterChange("experience", event.target.value)}
        className={styles.filterItem}
      >
        {experiences.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <TextField
        select
        label="Locations"
        defaultValue=""
        onChange={(event) => onFilterChange("remote", event.target.value)}
        className={styles.filterItem}
      >
        {locations.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default Filters;
