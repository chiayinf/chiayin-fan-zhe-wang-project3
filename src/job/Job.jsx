import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobDetail from "../JobDetail";
import ListJobDisplay from "../ListJobDisplay";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

//temp for listing all jobs
export default function Job() {
  const [allJobs, setAllJobs] = useState([]);

  function findAllJobs() {
    axios
      .get("http://localhost:8000/api/jobs/findAllJob")
      .then((response) => {
        setAllJobs(response.data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(findAllJobs, []);
  console.log("jobs are", allJobs);

  const jobListComponent = allJobs.map((job) => {
    return (
      <>
        {/* <p></p>
        <Link to={"detail/:" + job._id}>
          {job.jobTitle}, {job.location}, {job.companyName}
        </Link> */}
        <p></p>
        <ListGroup.Item as="li"> 
          Title: {job.jobTitle},  Location: {job.location}, Company: {job.companyName} 
          <br/>
          <Link to={"detail/:" + job._id}>check detail...</Link>
        </ListGroup.Item>
      </>
    );
  });
  return (
    <>
      <h1> These are all jobs in our dataBase</h1>
      <ListJobDisplay jobs = {allJobs}/>
      {/* {jobListComponent} */}
      {/* <ListGroup as="ol" numbered>
        {jobListComponent}
      </ListGroup> */}
    </>
  );
}
