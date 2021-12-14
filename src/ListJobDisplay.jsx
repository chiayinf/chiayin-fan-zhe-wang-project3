import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import getImage from "./helpers/helperFunctions";

export default function ListJobDisplay(props) {
  const allJobs = props.jobs;

  const jobListComponent = allJobs.map((job) => {
    return (
      <>
        <p></p>
        <ListGroup.Item as="li">
          <div class="companyIconImage">
            <img class="imageDisplay" src={getImage(job.companyImage)}></img>
          </div>
          Title: {job.jobTitle}, Location: {job.location}, Company:
          {job.companyName}
          <br />
          <Link to={"detail/:" + job._id}>check detail...</Link>
        </ListGroup.Item>
      </>
    );
  });
  return (
    <>
      <div class="jobListDisplay">
        <ListGroup as="ol" numbered>
          {jobListComponent}
        </ListGroup>
      </div>
    </>
  );
}
