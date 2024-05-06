import "./header.css";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addItem } from "../Store/jobSlice";
import {
  addFilteredItem,
  removeFilteredItem,
} from "../Store/jobSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const jobs = useSelector((state) => state.jobs.items);
  console.log();
  const backupJobs = useSelector((state) => state.jobs.backupItems);

  const [filters, setFilters] = useState({
    experience: 0,
    remote: "",
    companyName: "",
    location: "",
    techStack: "",
    role: "",
    clearItem: false,
  });

  useEffect(() => {
    const newData = jobs[0]?.filter((job) => {
      return Object.entries(filters).every(([key, value]) => {
        if (key === "experience") {
          if (value > 0) {
            return job.minExp === value;
          } else {
            return true;
          }
        }
        if (key === "remote") {
          if (value === "Remote") {
            return job?.location.toLowerCase().includes(value.toLowerCase());
          } else {
            return true;
          }
        }
        if (key === "companyName") {
          if (value.length > 0) {
            return job.companyName.toLowerCase().includes(value.toLowerCase());
          } else {
            return true;
          }
        }
        if (key === "location") {
          if (value.length > 0) {
            return job.location.toLowerCase().includes(value.toLowerCase());
          } else {
            return true;
          }
        }
        if (key === "techStack") {
          if (value.length > 0) {
            return job.jobRole.toLowerCase().includes(value.toLowerCase());
          } else {
            return true;
          }
        }
        if (key === "role") {
        if (value.length > 0) {
            return job.jobRole.toLowerCase().includes(value.toLowerCase());
           
          } else {
            return true;
          }
        }
        return true;
      });
    });
    setFilteredJobs(newData);
  }, [filters]);

  useEffect(() => {
    dispatch(addItem(filteredJobs));
    dispatch(addFilteredItem(filteredJobs));
  }, [filteredJobs]);

  const handleExpChange = (event) => {
    setFilters({ ...filters, experience: event.target.value });
  };

  const handleChangeRemote = (event) => {
    setFilters({ ...filters, remote: event.target.value });
  };

  const handleCompanyName = (event) => {
    setFilters({ ...filters, companyName: event.target.value });
  };

  const handleLocation = (event) => {
    setFilters({ ...filters, location: event.target.value });
  };

  const handleTechStack = (event) => {
    setFilters({ ...filters, techStack: event.target.value });
  };

  const handleRole = (event) => {
    setFilters({ ...filters, role: event.target.value });
  };

  const handleClear = () => {
    setFilters({
      experience: 0,
      remote: "",
      companyName: "",
      location: "",
      techStack: "",
      role: "",
      clearItem: true,
    });
    dispatch(removeFilteredItem());
    dispatch(addItem(backupJobs[backupJobs.length - 1]));
  };
  return (
    <div className="header__container">
      <p>Filters</p>
      <div className="filter">
        <div className="filter-item">
          <Box sx={{ minWidth: 120, width: "200px" }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label" className="input">
                Min Exp.
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filters.experience}
                label="Age"
                onChange={handleExpChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="filter-item">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label" className="input">
                Remote
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filters.remote}
                label="Remote"
                onChange={handleChangeRemote}
              >
                <MenuItem value={"Remote"}>Remote</MenuItem>
                <MenuItem value={"OnSite"}>OnSite</MenuItem>
                <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="filter-item">
          <TextField
            className="textField"
            id="outlined-basic"
            label="Company Name"
            variant="outlined"
            size="small"
            onChange={handleCompanyName}
          />
        </div>
        <div className="filter-item">
          <TextField
            className="textField"
            id="outlined-basic"
            label="Location"
            variant="outlined"
            size="small"
            onChange={handleLocation}
          />
        </div>
        <div className="filter-item">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label" className="input">
                Tech Stack
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filters.techStack}
                label="Tech Stack"
                onChange={handleTechStack}
              >
                <MenuItem value={"Android"}>Android</MenuItem>
                <MenuItem value={"Ios"}>Ios</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="filter-item">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label" className="input">
                Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filters.role}
                label="Role"
                onChange={handleRole}
              >
                <MenuItem value={"Frontend"}>Frontend</MenuItem>
                <MenuItem value={"Backend"}>Backend</MenuItem>
                <MenuItem value={"FullStack"}>FullStack</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="filter-item">
          <button onClick={handleClear}>Clear</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
