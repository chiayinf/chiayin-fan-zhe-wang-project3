import React from "react";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function ListJobDisplay(props) {
  const  allJobs = props.jobs;
  const jobListComponent = allJobs.map((job) => {
    return (
      <>
        {/* <p></p>
            <Link to={"detail/:" + job._id}>
              {job.jobTitle}, {job.location}, {job.companyName}
            </Link> */}
        <p></p>
        <ListGroup.Item as="li">
          Title: {job.jobTitle}, Location: {job.location}, Company:{" "}
          {job.companyName}
          <br />
          <Link to={"detail/:" + job._id}>check detail...</Link>
        </ListGroup.Item>
      </>
    );
  });
  return (
    <>
      <ListGroup as="ol" numbered>
        {jobListComponent}
      </ListGroup>
    </>
  );
}
