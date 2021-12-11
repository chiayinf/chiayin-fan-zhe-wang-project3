import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageUpload from "../ImageUpload";
import RichText from "../RichText";
import { useParams } from "react-router";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function Edit(props) {
  let jobId = useParams().jobId;
  if (jobId.length > 0 && jobId[0] === ":") {
    jobId = jobId.substring(1);
  }

  const [job, setAJob] = useState([]);

  const [jobTitleInput, setJobTitleInput] = useState("");
  const [companyNameInput, setCompanyNameInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [companyWebsiteInput, setCompanyWebsiteInput] = useState("");
  const [img, setImg] = useState("");

  const navigate = useNavigate();
  function findThatJob() {
    axios
      .get("/api/jobs/detail/" + jobId)
      .then((response) => {
        setAJob(response.data);
        setJobTitleInput(response.data.jobTitle);
        setCompanyNameInput(response.data.companyName);
        setLocationInput(response.data.location);
        setDescriptionInput(response.data.description);
        setEmailInput(response.data.employerEmailContact);
        setCompanyWebsiteInput(response.data.companyWebsite);
        setImg(response.data.companyImage);
      })

      .catch((error) => console.error(error));
  }

  useEffect(findThatJob, []);

  function onSubmitButtonClick() {
    const input = {
      _id: jobId,
      jobTitle: jobTitleInput,
      companyName: companyNameInput,
      location: locationInput,
      description: descriptionInput,
      employerEmailContact: emailInput,
      companyWebsite: companyWebsiteInput,
      companyImage: img,
    };

    const errorMsg = validateForm(input);
    if (errorMsg) {
      alert(errorMsg);
      return errorMsg;
    }
    const api = "/api/jobs/detail/" + jobId;
    axios
      .put(api, input)
      .then((res) => {
        alert("update succeed");
        navigate("/job/detail/:" + jobId);
      })
      .catch((error) => {
        alert("update fail");
      });
  }

  return (
    <>
      <h1>Your are in the Editing mode for job {jobTitleInput}</h1>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label className="reqField">Job Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the job title you want to create"
            value={jobTitleInput}
            onChange={(e) => {
              setJobTitleInput(e.target.value);
            }}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label className="reqField">Company Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the company"
            value={companyNameInput}
            onChange={(e) => {
              setCompanyNameInput(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label className="reqField">Company Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the location for this job"
            value={locationInput}
            onChange={(e) => {
              setLocationInput(e.target.value);
            }}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="reqField">Company Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email for company contacter"
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.target.value);
            }}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Company Website</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the Company website"
            value={companyWebsiteInput}
            onChange={(e) => {
              setCompanyWebsiteInput(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label className="reqField">Job Description</Form.Label>

          <CKEditor
            editor={ClassicEditor}
            data={descriptionInput}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescriptionInput(data);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Upload image for company</Form.Label>
          <Form.Text className="text-muted">(optional)</Form.Text>
          <ImageUpload setImg={setImg} />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={onSubmitButtonClick}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export function validateForm(form) {
  if (!form.jobTitle) {
    return "You must type in a job name.";
  }
  if (!form.companyName) {
    return "You must type in a company name.";
  }
  if (!form.location) {
    return "You must type in location.";
  }
  if (!form.description) {
    return "You must type in description.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.employerEmailContact)) {
    return "You must type in an valid email";
  }
  return null;
}
