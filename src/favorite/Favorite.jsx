import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListJobDisplay from "../ListJobDisplay";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import getImage from "../helpers/helperFunctions";

//temp for listing all jobs
export default function Job() {
  const [allJobs, setAllJobs] = useState([]);
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
    let cur = job.notValid ? (
      <div>Sorry this job is not valid anymore, unfavorite to remove it</div>
    ) : (
      <div>
        {" "}
        Title: {job.jobTitle}, Location: {job.location}, Company:
        {job.companyName}
      </div>
    );
    return (
      <>
        <ListGroup.Item as="li">
          <div class="companyIconImage">
            <img class="imageDisplay" src={getImage(job.companyImage)}></img>
          </div>
          <div>Job Status: {job.status}</div>
          {cur}
          <br />
          <Link to={"detail/:" + job.jobId}>check detail...</Link>
        </ListGroup.Item>
      </>
    );
  });

  return (
    <>
      <Container>
        <h1> These are your Favorite jobs</h1>
        <div class="jobListDisplay">
          <ListGroup as="ol" numbered>
            {jobListComponent}
          </ListGroup>
        </div>
      </Container>
    </>
  );
}
