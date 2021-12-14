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
import Container from "react-bootstrap/Container";


//temp for listing all jobs
export default function Job() {
  const [allJobs, setAllJobs] = useState([]);

  function findAllJobs() {
    axios
      .get("/api/jobs/findAllJob")
      .then((response) => {
        setAllJobs(response.data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(findAllJobs, []);

  return (
    <>
     <Container>
      <h1> These are all jobs in our dataBase</h1>
      <ListJobDisplay jobs = {allJobs}/>
      </Container>
    </>
  );
}
