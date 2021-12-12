import React from "react";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./style.css";

export default function ListJobDisplay(props) {
  const allJobs = props.jobs;
  const jobListComponent = allJobs.map((job) => {
    return (
      <>
        {/* <p></p>
            <Link to={"detail/:" + job._id}>
              {job.jobTitle}, {job.location}, {job.companyName}
            </Link> */}
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

function getImage(companyImage) {
  if (!companyImage) {
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDkvFCLSMbUU6Bqb1m-0y3LPAQ7_Gcs-PNZw&usqp=CAU";
  }
  return companyImage;
}
