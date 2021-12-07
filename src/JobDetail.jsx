import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReactHtmlParser from "react-html-parser";
import { useNavigate } from "react-router-dom";

export default function (props) {
  let id = useParams().jobId;
  console.log("here", id);
  if (id.length > 0 && id[0] === ":") {
    id = id.substring(1);
  }
  const userId = "pc";
  console.log("id front is", id);
  const [fav, setFav] = useState("unFav");
  const [jobSt, setSt] = useState("");
  findFavStatus(userId, id, setFav, setSt);
  console.log("fav", fav);
  const [job, setAJob] = useState([]);

  const navigate = useNavigate();
  function findThatJob() {
    axios
      .get("http://localhost:8000/api/jobs/detail/" + id)
      .then((response) => {
        setAJob(response.data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(findThatJob, []);
  console.log("jobs are", job.jobTitle);

  function onDeleteClick() {
    axios
      .delete("http://localhost:8000/api/jobs/" + id)
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
      const favId = userId + "_" + id;
      const api = "http://localhost:8000/api/favs/" + favId;
      console.log("api is ", api);
      axios
        .post(api, { id: favId, userId: userId, jobId: id, jobTitle:job.jobTitle,
            companyName:job.companyName,
            location:job.location  })
        .then((response) => {
          console.log(response.data);
          alert("fav succeed");
          setFav("fav");
          setSt(response.data["status"])
        })
        .catch((error) => {
          console.log("fav ", error);
          alert("fav fail");
        });
    } else {
      const favId = userId + "_" + id;
      const api = "http://localhost:8000/api/favs/" + favId;
      axios
        .delete(api)
        .then((response) => {
          console.log("done");
          alert("fav delete succeed");
          setFav("unFav");
        })
        .catch((error) => {
          console.log("fav ", error);
          alert("fav fail");
        });
    }
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
      <div>Action status: {job.status}</div>
    </>
  ) : (
    <div> No job found </div>
  ); //shouldn't see this

  const jobStComponent = fav ==="fav" ? (
    <>

<div> currApplyStatus: {jobSt}</div>
      <label for="jstatus">Change your status:</label>
      <select name="jstatus" id="jstatus">
        <option value="Not started">Not started</option>
        <option value="Applied">Applied</option>
        <option value="Interview scheduled">Interview scheduled</option>
        <option value="Accepted">Accepted</option>
        <option value="Rejected">Rejected</option>
      </select>

    </>
  ) : (
    <div> make it Fav to change job Status </div>
  ); //shouldn't see this

  return (
    <>
      <h1>Here is the detail page</h1>

      {jobComponent}

      <button>Edit</button>
      <button onClick={onDeleteClick}>Delete</button>
      <button onClick={favClick}>Favorite</button>
      <div> fav St: {fav}</div>
      {jobStComponent}
    </>
  );
}

function findFavStatus(userId, jobId, setFav,setSt) {
  const api = "http://localhost:8000/api/favs/detail/" + userId + "_" + jobId;
  axios
    .get(api)
    .then((response) => {
      //console.log("rs ", response);
      if (response.data) {
        setFav("fav");
        setSt(response.data["status"]);
      }
    })
    .catch((error) => {
      console.log("wrong for fetach", error);
    });
}
