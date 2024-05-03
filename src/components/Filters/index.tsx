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
  { value: "10", label: "10k" },
  { value: "20", label: "20k" },
  { value: "30", label: "30k" },
  { value: "40", label: "40k" },
  { value: "50", label: "50k" },
  { value: "60", label: "60k" },
  { value: "70", label: "70k" },
  { value: "80", label: "80k" },
  { value: "90", label: "90k" },
  { value: "100", label: "100k" },
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
      />
    </Box>
  );
};

export default Filters;
