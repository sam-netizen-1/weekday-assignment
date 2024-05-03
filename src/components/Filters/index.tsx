import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "./Filters.module.scss";
import Select from "react-select";
import { MenuItem } from "@mui/material";

interface FiltersProps {
  onFilterChange: any;
}

const roles = ["frontend", "ios", "android", "tech lead", "backend"];
const experiences = ["1 ", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const locations = ["remote", "delhi ncr", "mumbai", "chennai", "bangalore"];
const basePayRanges = ["<10k", "10k-30k", "30k-50k", "50k+"];

const Filters = ({ onFilterChange }: FiltersProps) => {
  const handleSelectChange = (selectedOption: any, filterName: string) => {
    const selectedValues = selectedOption ? selectedOption.value : "";
    onFilterChange(filterName, selectedValues);
  };

  return (
    <Box className={styles.filtersBar}>
      <Select
        options={experiences.map((exp) => ({ value: exp, label: exp }))}
        placeholder="Min Experience"
        onChange={(selectedOption) =>
          handleSelectChange(selectedOption, "experience")
        }
        className={styles.filterItem}
        isClearable
      />
      <Select
        options={locations.map((loc) => ({ value: loc, label: loc }))}
        placeholder="Location"
        onChange={(selectedOption) =>
          handleSelectChange(selectedOption, "location")
        }
        className={styles.filterItem}
        isMulti
        isClearable
      />
      <Select
        options={roles.map((role) => ({ value: role, label: role }))}
        placeholder="Role"
        onChange={(selectedOption) =>
          handleSelectChange(selectedOption, "role")
        }
        className={styles.filterItem}
        isMulti
        isClearable
      />
      <Select
        options={basePayRanges.map((pay) => ({ value: pay, label: pay }))}
        placeholder="Min Base Pay"
        onChange={(selectedOption) =>
          handleSelectChange(selectedOption, "basePay")
        }
        className={styles.filterItem}
        isClearable
      />
      <TextField
        label="Company Name"
        onChange={(event) => onFilterChange("companyName", event.target.value)}
        className={styles.filterItem}
      />
    </Box>
  );
};

export default Filters;
