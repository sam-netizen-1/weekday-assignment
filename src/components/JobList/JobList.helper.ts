import { RootState } from "../../redux/store";
import { IJob } from "../JobCard/JobCard.types";

export const selectFilteredJobs = (state: RootState) => {
  const { jobs, filters } = state.jobs;
  return jobs.filter((job: IJob) => {
    return (
      (filters?.experience
        ? job?.minExp && job?.minExp >= parseInt(filters?.experience)
        : true) &&
      (filters?.location?.length
        ? filters.location.some((location: any) =>
            job.location.toLowerCase().includes(location.toLowerCase())
          )
        : true) &&
      (filters?.role?.length
        ? filters.role.some((role: any) =>
            job.jobRole.toLowerCase().includes(role.toLowerCase())
          )
        : true) &&
      (filters?.companyName
        ? job?.companyName
            ?.toLowerCase()
            .includes(filters.companyName.toLowerCase())
        : true) &&
      (filters?.basePay
        ? job?.minJdSalary && job?.minJdSalary >= parseInt(filters.basePay)
        : true)
    );
  });
};

export function throttle(func: () => void, limit: number): () => void {
  let inThrottle: boolean;
  return function (): void {
    const args = arguments;
    //@ts-ignore
    const context = this;
    if (!inThrottle) {
      //@ts-ignore
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
