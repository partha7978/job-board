import React, { useState, useEffect, useRef, useCallback } from "react";
import "./jobs.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import useJobSearch from "../Hooks/useJobSearch";
import { useSelector } from "react-redux";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";
import { RiHome7Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CardContentData = ({ job }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="job-body">
        <CardContent
          className="job-card-header"
          sx={{ margin: 0, paddingLeft: 0, paddingRight: 0 }}
        >
          <div className="job-logo">
            <img src={job.logoUrl} alt="logo" />
          </div>
          <div className="job__header">
            <span>{job.companyName}</span>
            <span>{job.jobRole}</span>
            <div className="job__header-subText">
              <span>
                <RiMoneyRupeeCircleLine />
                {job.minJdSalary
                  ? `${job.minJdSalary / 10}-${job.maxJdSalary / 10} LPA`
                  : `${job.maxJdSalary / 10} LPA`}
              </span>
              <span>
                {job.location === "remote" ? (
                  <>
                    <RiHome7Line /> {job.location}
                  </>
                ) : (
                  <>
                    <GrLocation /> {job.location}
                  </>
                )}
              </span>
            </div>
          </div>
        </CardContent>
        <CardContent className="job-card-body" sx={{ margin: 0, padding: 0 }}>
          <div className="job-desc">
            <p>About us</p>
            <span>{job.jobDetailsFromCompany?.slice(0, 100)}...</span>
            <button onClick={handleOpen}>View Job Desc</button>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Job Description
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {job.jobDetailsFromCompany}
              </Typography>
            </Box>
          </Modal>
        </CardContent>
      </div>
      <CardActions
        className="apply-btn"
        sx={{ margin: 0, paddingLeft: 0, paddingRight: 0 }}
      >
        <a href={job.jdLink} target="_blank">
          <Button size="small" sx={{ color: "#fff" }}>
            Click Here to Apply
          </Button>
        </a>
      </CardActions>
    </>
  );
};

const Jobs = () => {
  const [limit, setLimit] = useState(10);

  const { loading, hasMore, jobData } = useJobSearch(limit);
  const extractMore = hasMore <= jobData?.jdList?.length ? false : true;

  const filteredData = useSelector((state) => state.jobs.filteredItems);
  const showFiltered = filteredData[filteredData.length - 1];
  const observer = useRef();
  const lastJobElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && extractMore) {
          // console.log(extractMore, "extractMore");
          setLimit(limit + 10);
          // console.log(limit, "limit");
        }
      });
      if (node) observer.current.observe(node);
      // console.log(node, "node");
    },
    [loading, hasMore]
  );
  

  return (
    <>
      {filteredData.length > 1 && filteredData[filteredData.length - 1] ? (
        <div className="jobs__container">
          {showFiltered?.map((job, index) => {
            return (
              <React.Fragment key={job + index}>
                <Card className="job-card">
                  <CardContentData job={job} />
                </Card>
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="jobs__container">
            {jobData?.jdList?.map((job, index) => {
              if (jobData?.jdList.length === index + 1) {
                return (
                  <React.Fragment key={job + index}>
                    <Card className="job-card" ref={lastJobElementRef}>
                      <CardContentData job={job} />
                    </Card>
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={job + index}>
                    <Card className="job-card">
                      <CardContentData job={job} />
                    </Card>
                  </React.Fragment>
                );
              }
            })}
          </div>
          {loading && <h1>Loading ....</h1>}
          {hasMore <= jobData?.jdList?.length && (
            <h2>You have reached the end</h2>
          )}
        </div>
      )}
    </>
  );
};

export default Jobs;

CardContentData.propTypes = {
  job: PropTypes.object.isRequired,
};
