import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobDetail from "../JobDetail";
import ListJobDisplay from "../ListJobDisplay";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "react-bootstrap";
//temp for listing all jobs
export default function Job() {
  const [allJobs, setAllJobs] = useState([]);
  const [t, setT] = useState([]);
  //const userId = "pc";

  function cmp(a, b) {
    const mp = {
      "Not Started": 1,
      Applied: 2,
      "Interview Scheduled": 3,
      Accepted: 4,
      Rejected: 5,
    };
    return mp[a["status"]] - mp[b["status"]];
  }

  function findAllJobs() {
    axios
      .get("/api/favs/")
      .then((response) => {
        response.data.sort(cmp);
        //fetch all jobs's condition and store in data
        const tmp = [...response.data];
        const favDetail = async () => {
          return Promise.all(
            tmp.map(async (job) => {
              const res = await axios.get("/api/jobs/detail/" + job.jobId);
              if (!res.data) {
                job.notValid = true;
              }
              const dt = res.data;
              job.jobTitle = dt.jobTitle;
              job.location = dt.location;
              job.companyName = dt.companyName;
              return job;
            })
          );
        };

        favDetail().then((data) => {
          setAllJobs(data);
        });
      })
      .catch((error) => console.error(error));
  }

  useEffect(findAllJobs, []);

  const jobListComponent = allJobs.map((job) => {
    return job.notValid ? (
      <>
        <p></p>
        <div>Job Status: {job.status}</div>
        <Link to={"detail/:" + job.jobId}><div>Sorry this job is not valid anymore, unfavorite to remove it</div></Link>
      </>
    ) : (
      <>
        <p></p>
        <div>Job Status: {job.status}</div>
        <Link to={"detail/:" + job.jobId}>
        Title: {job.jobTitle}, Location: {job.location}, Company:{job.companyName}
        </Link>
      </>
    );
  });

  return (
    <>
      <h1> These are your Favorite jobs</h1>
      {jobListComponent}
      {/* {res} */}
      {/* <ListJobDisplay jobs = {allJobs}/> */}
    </>
  );
}
