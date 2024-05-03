import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Job {
  jdUid: string;
  jdLink: string;
  jobDetailsFromCompany: string;
  maxJdSalary: number;
  minJdSalary: number;
  salaryCurrencyCode: string;
  location: string;
  minExp: number;
  maxExp: number;
  jobRole: string;
  companyName: string;
  logoUrl: string;
}

export interface JobsState {
  jobs: Job[];
  isFetching: boolean;
  hasMore: boolean;
  offset: number;
  filters: any;
}

const initialState: JobsState = {
  jobs: [],
  isFetching: false,
  hasMore: true,
  offset: 0,
  filters: {
    experience: "",
    location: [],
    role: [],
    basePay: "",
    companyName: "",
  },
};

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, { getState }) => {
    const {
      jobs: { offset, isFetching, hasMore },
    } = getState() as RootState;

    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ limit: 20, offset }),
      }
    );
    const data = await response.json();
    return data;
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{
        filterName: string;
        value: any;
      }>
    ) => {
      const { filterName, value } = action.payload;
      state.filters[filterName] = value;
    },
    setFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      if (!action.payload) return;

      const jobs = action.payload.jdList as Job[];
      state.jobs = [...state.jobs, ...jobs];
      state.offset += jobs.length;
      state.hasMore = action.payload.totalCount > state.jobs.length;
      state.isFetching = false;
    });
  },
});

export const { setFilter, setFetching } = jobsSlice.actions;
export default jobsSlice.reducer;
