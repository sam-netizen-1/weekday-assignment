import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import styles from "./Filters.module.scss";
import { setFilter } from "../../redux/JobsSlice";

interface OptionType {
  value: string;
  label: string;
}

const roles: OptionType[] = [
  { value: "frontend", label: "Frontend" },
  { value: "ios", label: "iOS" },
  { value: "android", label: "Android" },
  { value: "tech lead", label: "Tech Lead" },
  { value: "backend", label: "Backend" },
];

const experiences: OptionType[] = [
  { value: "1", label: "1 year" },
  { value: "2", label: "2 years" },
  { value: "3", label: "3 years" },
  { value: "4", label: "4 years" },
  { value: "5", label: "5 years" },
  { value: "6", label: "6 years" },
  { value: "7", label: "7 years" },
  { value: "8", label: "8 years" },
  { value: "9", label: "9 years" },
  { value: "10", label: "10+ years" },
];

const locations: OptionType[] = [
  { value: "remote", label: "Remote" },
  { value: "delhi ncr", label: "Delhi NCR" },
  { value: "mumbai", label: "Mumbai" },
  { value: "chennai", label: "Chennai" },
  { value: "bangalore", label: "Bangalore" },
];

const basePayRanges: OptionType[] = [
  { value: "<10k", label: "<10k" },
  { value: "10k-30k", label: "10k-30k" },
  { value: "30k-50k", label: "30k-50k" },
  { value: "50k+", label: "50k+" },
];

const Filters: React.FC = () => {
  const dispatch = useDispatch();

  const handleSelectChange = (selectedOption: any, filterName: string) => {
    let value: string | string[] = "";

    if (Array.isArray(selectedOption)) {
      value = selectedOption.map((option) => option.value);
    } else if (selectedOption) {
      value = selectedOption.value;
    }

    dispatch(setFilter({ filterName, value }));
  };

  return (
    <Box className={styles.filtersBar}>
      <Select
        options={experiences}
        placeholder="Min Experience"
        onChange={(selectedOption) =>
          handleSelectChange(selectedOption, "experience")
        }
        className={styles.filterItem}
        isClearable
      />
      <Select
        options={locations}
        placeholder="Location"
        onChange={(selectedOption) =>
          handleSelectChange(selectedOption, "location")
        }
        className={styles.filterItem}
        isMulti
        isClearable
      />
      <Select
        options={roles}
        placeholder="Role"
        onChange={(selectedOption) =>
          handleSelectChange(selectedOption, "role")
        }
        className={styles.filterItem}
        isMulti
        isClearable
      />
      <Select
        options={basePayRanges}
        placeholder="Min Base Pay"
        onChange={(selectedOption) =>
          handleSelectChange(selectedOption, "basePay")
        }
        className={styles.filterItem}
        isClearable
      />
      <TextField
        label="Company Name"
        onChange={(e) =>
          dispatch(
            setFilter({ filterName: "companyName", value: e.target.value })
          )
        }
        className={styles.filterItem}
      />
    </Box>
  );
};

export default Filters;
