import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReactHtmlParser from "react-html-parser";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function (props) {
  const [user, setUser] = useState(undefined);

  function whoIsLoggedIn() {
    console.log("check");
    axios
      .get("/api/users/whoIsLoggedIn")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.error(error));
  }
  useEffect(whoIsLoggedIn, []);
  console.log("username", user);

  let id = useParams().jobId;
  if (id.length > 0 && id[0] === ":") {
    id = id.substring(1);
  }

  const [fav, setFav] = useState("unFav");
  const [jobSt, setJobSt] = useState("Not Started");
  const [curJobSt, setCurJobSt] = useState("");
  findFavStatus(id, setFav, setCurJobSt);
  // console.log("fav", fav);
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
        console.log(" delete done");
        alert("delete succeed");
        navigate("/job");
      })
      .catch((error) => {
        console.log("delete fail", error);
        alert("delete fail");
      });
  }

  function favClick() {
    console.log("sryff", fav);
    if (fav === "unFav") {
      const api = "/api/favs/" + id;
      console.log("api is ", api);
      axios
        .post("/api/favs/", {
          //id: favId,
          //userId: userId,
          jobId: id,
          jobTitle: job.jobTitle,
          companyName: job.companyName,
          location: job.location,
        })
        .then((response) => {
          console.log(response.data);
          alert("fav succeed");
          setFav("fav");
          setJobSt(response.data["status"]);
        })
        .catch((error) => {
          console.log("fav ", error);
          alert("fav fail");
        });
    } else {
      axios
        .delete("/api/favs/" + id)
        .then((response) => {
          console.log("done");
          alert("fav delete succeed");
          setFav("unFav");
        })
        .catch((error) => {
          console.log("fav ", error);
          alert("un fav fail");
        });
    }
  }

  function onListen(e) {
    setJobSt(e.target.value);
    console.log("cgx", e.target.value);
  }

  function statusChangeClick(e) {
    console.log("cs", jobSt);
    //const favId = userId + "_" + id;
    const api = "/api/favs/" + id;
    axios
      .put(api, { status: jobSt })
      .then((response) => {
        alert("update st succeed");
        window.location.reload();
      })
      .catch((error) => {
        alert("st st fail");
      });
  }

  const jobComponent = job ? (
    <>
      <div>job Name: {job.jobTitle}</div>
      <div>Company name: {job.companyName}</div>
      <div>Location: {job.location}</div>
      <div>
        Description:
        <div>{ReactHtmlParser(job.description)}</div>
      </div>
      <div>Employer email contact: {job.employerEmailContact}</div>
      <div>CompanyWebsite: {job.companyWebsite}</div>
      <div>Posting date: {job.postingDate}</div>
      <div>
        Image:
        <img src={job.companyImage}></img>
      </div>
    </>
  ) : (
    <div> No job found </div>
  ); //shouldn't see this

  const jobStComponent =
    fav === "fav" ? (
      <>
        <div> currApplyStatus: {curJobSt}</div>
        {/* <select val={jobSt} onChange={onListen}>
          <option value="Not Started">Not Started</option>
          <option value="Applied">Applied</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select> */}
        <br />
        <div> change your job application status:</div>
        <Form.Select val={jobSt} onChange={onListen}>
          <option value="Not Started">Not Started</option>
          <option value="Applied">Applied</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </Form.Select>

        <Button onClick={statusChangeClick}>Submit Status Change</Button>
      </>
    ) : (
      <div> make it Fav to change job Status </div>
    ); //shouldn't see this

  const editComponent = user===job.createBy ? (
    <>
      <Button
        onClick={(onEdit) => {
          navigate("/edit/:" + id);
        }}
      >
        Edit
      </Button>
      <Button onClick={onDeleteClick}>Delete</Button>{" "}
    </>
  ) : (
    <div> Create more jobs! </div>
  );

  const favComponent = user ? (
    <>
      <Button onClick={favClick}>Favorite {getHeart(fav)}</Button>
      {/* <div> fav St: {fav}</div> */}
    </>
  ) : (
    <div> Log in to unlock more functions! </div>
  );
  return (
    <>
      <h1>Here is the detail page for job {job.jobTitle}</h1>

      {/* <Button
        onClick={(onEdit) => {
          navigate("/edit/:" + id);
        }}
      >
        Edit
      </Button>
      <Button onClick={onDeleteClick}>Delete</Button> */}
      {favComponent}
      {jobComponent}
      {editComponent}
      {/* <Button onClick={favClick}>Favorite {getHeart(fav)}</Button> */}
    </>
  );
}

function findFavStatus(jobId, setFav, setSt) {
  const api = "/api/favs/detail/" + jobId;
  console.log("finding stauts api", api);
  axios
    .get(api)
    .then((response) => {
      console.log("rs ", response);
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
