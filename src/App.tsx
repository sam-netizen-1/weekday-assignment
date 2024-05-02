import "./App.scss";
import Filters from "./components/Filters";
import JobList from "./components/JobList";

function App() {
  return (
    <div>
      <Filters onFilterChange={() => {}} />
      <JobList />
    </div>
  );
}

export default App;
