import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReactHtmlParser from "react-html-parser";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import getImage from "./helpers/helperFunctions";

export default function (props) {
  const [user, setUser] = useState(undefined);

  function whoIsLoggedIn() {
    axios
      .get("/api/users/whoIsLoggedIn")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.error(error));
  }
  useEffect(whoIsLoggedIn, []);

  let id = useParams().jobId;
  if (id.length > 0 && id[0] === ":") {
    id = id.substring(1);
  }

  const [fav, setFav] = useState("unFav");
  const [jobSt, setJobSt] = useState("Not Started");
  const [curJobSt, setCurJobSt] = useState("");
  findFavStatus(id, setFav, setCurJobSt);
  const [job, setAJob] = useState([]);

  const navigate = useNavigate();
  function findThatJob() {
    axios
      .get("/api/jobs/detail/" + id)
      .then((response) => {
        setAJob(response.data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(findThatJob, []);

  function onDeleteClick() {
    axios
      .delete("/api/jobs/" + id)
      .then((response) => {
        alert("delete succeed");
        navigate("/job");
      })
      .catch((error) => {
        alert("delete fail");
      });
  }

  function favClick() {
    if (fav === "unFav") {
      axios
        .post("/api/favs/", {
          jobId: id,
        })
        .then((response) => {
          //alert("favorite succeed");
          setFav("fav");
          setJobSt(response.data["status"]);
        })
        .catch((error) => {
          alert("fav fail");
        });
    } else {
      axios
        .delete("/api/favs/" + id)
        .then((response) => {
          //alert("unfavorite succeed");
          setFav("unFav");
        })
        .catch((error) => {
          alert("un fav fail");
        });
    }
  }

  function onListen(e) {
    setJobSt(e.target.value);
  }

  function statusChangeClick(e) {
    const api = "/api/favs/" + id;
    axios
      .put(api, { status: jobSt })
      .then((response) => {
        alert("update status succeed");
        window.location.reload();
      })
      .catch((error) => {
        alert("set status fail");
      });
  }

  const jobComponent = job ? (
    <>
      <div class="jobD">
        <div class ="jobContent">Job Name: </div>
         <div class ="jobDetail">{job.jobTitle}</div>
         <div class ="jobContent">Company name: </div>
         <div class ="jobDetail">{job.companyName}</div>
         <div class ="jobContent">Location: </div>
         <div class ="jobDetail">{job.location}</div>
         <div class ="jobContent">Job Description: </div>
         <div class ="jobDetail">{ReactHtmlParser(job.description)}</div>
         <div class ="jobContent">Email contact: </div>
         <div class ="jobDetail">{job.employerEmailContact}</div>
         <div class ="jobContent">Company Website:</div>
         <div class ="jobDetail">{job.companyWebsite}</div>
         <div class ="jobContent">Posting date: </div>
         <div class ="jobDetail">{job.postingDate}</div>
         <div class ="jobContent"> Company Image:</div>
          <div class="companyImage jobDetail">
            <img class="imageDisplay" src= {getImage(job.companyImage)}></img>
          </div>
      </div>
    </>
  ) : (
    <div> Job is unavailable right now </div>
  );

  const jobStComponent =
    fav === "fav" ? (
      <>
        <div> Your Current Apply Status: {curJobSt}</div>
        <br />
        <div> Change your job application status:</div>
        <Form.Select val={jobSt} onChange={onListen}>
          <option value="Not Started">Not Started</option>
          <option value="Applied">Applied</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </Form.Select>

        <Button variant="success" onClick={statusChangeClick}>Submit Status Change</Button>
      </>
    ) : (
      <div> Favoriate to track application Status! </div>
    ); //shouldn't see this

  const editComponent =
    user === job.createBy ? (
      <>
        <Button variant="warning"
          onClick={(onEdit) => {
            navigate("/edit/:" + id);
          }}
        >
          Edit
        </Button>
        <Button  variant="danger" onClick={onDeleteClick}>Delete</Button>{" "}
      </>
    ) : (
      <></>
    );

  const favComponent = user ? (
    <>
      <Button variant="success" onClick={favClick}>Favorite {getHeart(fav)}</Button>
      {/* <div> fav St: {fav}</div> */}
      {jobStComponent}
    </>
  ) : (
    <div> Log in to unlock more functions! </div>
  );
  return (
    <>
    <Container>
      <h1>Here is the detail page for job {job.jobTitle}</h1>
      {favComponent}
      {jobComponent}
      {editComponent}
      </Container>
    </>
  );
}

function findFavStatus(jobId, setFav, setSt) {
  const api = "/api/favs/detail/" + jobId;
  axios
    .get(api)
    .then((response) => {
      if (response.data) {
        setFav("fav");
        setSt(response.data["status"]);
      }
    })
    .catch((error) => {
      console.log("wrong for fetach", error);
    });
}

function getHeart(fav) {
  if (fav === "fav")
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-heart-fill"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
        />
      </svg>
    );
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-heart"
      viewBox="0 0 16 16"
    >
      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
    </svg>
  );
}
