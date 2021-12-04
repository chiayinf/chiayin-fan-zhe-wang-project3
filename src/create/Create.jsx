import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageUpload from "../ImageUpload";
import RichText from "../RichText";

export default function Create() {
  // const [formInput, setFormInput] = useState('');
  // const [job, setjob] = useState({
  //   name: 'No job selected', health: -1,
  // })

  const [jobTitleInput, setJobTitleInput] = useState("");
  const [companyNameInput, setCompanyNameInput] = useState("");
  const [errorMsg, setError] = useState(null);

  function onSubmitButtonClick() {
    // const job = axios.get('...')
    // console.log(job);

    if (!jobTitleInput) {
      setError("You must type in a job name.");
      return;
    }
    if (!companyNameInput) {
      setError("You must type in a  company name.");

      alert("You must type in a company name.");
      return;
    }

    console.log("hello, there", jobTitleInput);
    const input = { jobTitle: jobTitleInput, companyName: companyNameInput };

    axios
      .post("http://localhost:8000/api/jobs/createNewJob", input)
      .then((response) => {
        //setjob(response.data)
        console.log("done");
      })
      .catch((error) => {
        console.log("fial", error);
        setError( error);
      });
      //debugger;

    //   axios
    //   .get("http://localhost:8000/api/jobs/findAlljob" )
    //   .then((response) => {
    //     //setjob(response.data)
    //     console.log("done");
    //     debugger;
    //   })
    //   .catch((error) => {
    //     console.log("fial", error);
    //     setError( error);
    //   });
    //   debugger;
  }
  return (
    <>
      <h1>This is the page for create a job</h1>
      {errorMsg}
      <form>
        {/* <label>
          JobTitle
          <input type="text" name="jobTitle" />
        </label> */}
        {/* <input type="submit" value="Submit" /> */}
        <div>JobTitle</div>
        <input
          type="text"
          value={jobTitleInput}
          onChange={(e) => {
            setError(null);
            setJobTitleInput(e.target.value);
          }}
        />
        <div>Company Name</div>
        <input
          type="text"
          value={companyNameInput}
          onChange={(e) => {
            setError(null);
            setCompanyNameInput(e.target.value);
          }}
        />
        <button onClick={onSubmitButtonClick}>Submit</button>
        <div>company Name: {companyNameInput}</div>
      </form>
      <br />
      <ImageUpload />
      <RichText />

      <br />
    </>
  );
}
