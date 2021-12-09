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
      .get("http://localhost:8000/api/jobs/detail/" + jobId)
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

    if (!locationInput) {
      setError("You must type in a  locationInput.");

      alert("You must type inlocationInput.");
      return;
    }
    if (!descriptionInput) {
      setError("You must type in a  descriptionInput.");

      alert("You must type inldescriptionInput.");
      return;
    }
    if (!emailInput) {
      setError("You must type in a emailInput");

      alert("You must type emailInput.");
      return;
    }

    const input = {
        _id:jobId,
      jobTitle: jobTitleInput,
      companyName: companyNameInput,
      location: locationInput,
      description: descriptionInput,
      employerEmailContact: emailInput,
      companyWebsite: companyWebsiteInput,
      companyImage: img,
    };

     const api = "http://localhost:8000/api/jobs/detail/" + jobId;
    axios
      .put(api, input)
      .then((response) => {
        console.log("done");
        alert("update succeed");
        navigate("/job/detail/:"+jobId);
      })
      .catch((error) => {
        console.log("fial", error);
        setError(error);
        alert("update  fail");
      });
    //debugger;
  }

  return (
    <>
      <h1>Your are in the Editing mode for job {jobTitleInput}</h1>
     

      {/* <ImageUpload setImg={setImg} />
      <br />

      <form>
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
        <div>Company Location</div>
        <input
          type="text"
          value={locationInput}
          onChange={(e) => {
            setError(null);
            setLocationInput(e.target.value);
          }}
        />
        <div>Company Email</div>
        <input
          type="email"
          value={emailInput}
          onChange={(e) => {
            setError(null);
            setEmailInput(e.target.value);
          }}
        />
        <div>Company Website</div>
        <input
          type="text"
          value={companyWebsiteInput}
          onChange={(e) => {
            setError(null);
            setCompanyWebsiteInput(e.target.value);
          }}
        />

        <div>Fill in Job description</div>
        <CKEditor
          editor={ClassicEditor}
          data={descriptionInput}
          // data="<p>Type in anything you want!</p>"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log("done data", { event, editor, data });
            setDescriptionInput(data);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />

        <button onClick={onSubmitButtonClick}>Submit</button>
      </form>
      <br />
 */}

      <Form>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label className="reqField">Job Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the job title you want to create"
            value={jobTitleInput}
            onChange={(e) => {
              setError(null);
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
              setError(null);
              setCompanyNameInput(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label className="reqField">Company Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the location for this job"
            value={locationInput}
            onChange={(e) => {
              setError(null);
              setLocationInput(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="reqField">Company Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email for company contacter"
            value={emailInput}
            onChange={(e) => {
              setError(null);
              setEmailInput(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Company Website</Form.Label>
          <Form.Control type="text" placeholder="Enter the Company website" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label className="reqField">Job Description</Form.Label>

          <CKEditor
            editor={ClassicEditor}
            data={descriptionInput}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log("done data", { event, editor, data });
              setDescriptionInput(data);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Upload New image for company</Form.Label>
          <Form.Text className="text-muted">(optional)</Form.Text>
          <ImageUpload setImg={setImg} />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={onSubmitButtonClick}>
          Submit
        </Button>
      </Form>

      <br />
    </>
  );
}
