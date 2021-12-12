import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageUpload from "../ImageUpload";
import RichText from "../RichText";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "../style.css";

export default function Create(props) {
  const [jobTitleInput, setJobTitleInput] = useState("");
  const [companyNameInput, setCompanyNameInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [companyWebsiteInput, setCompanyWebsiteInput] = useState("");
  const [img, setImg] = useState("");

  const navigate = useNavigate();

  function onSubmitButtonClick() {
    const input = {
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
    axios
      .post("/api/jobs/createNewJob", input)
      .then((res) => {
        console.log("done", res);
        alert("create succeed");
        navigate("/job");
      })
      .catch((error) => {
        console.log("fail", error);

        alert("create fail");
      });
  }

  return (
    <>
    <Container>
      <h1>You are trying to create a new job</h1>
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
          <Form.Text className="text-muted">(optional)</Form.Text>
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
            data=""
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
      </Container>
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
