import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


//https://medium.com/@ibamibrhm/custom-upload-button-image-preview-and-image-upload-with-react-hooks-a7977618ee8c

//https://dev.to/asimdahall/client-side-image-upload-in-react-5ffc

export default function ImageUpload(props) {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    console.log("ff", file);
    if(file.size >50 *1024) {
      alert("please choose a picture size less than 50KB.");
      return;
    }
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
        props.setImg(current.src);
      };
      reader.readAsDataURL(file);
    }
  };

  // function submitImage() {
  //   const api = "http://localhost:8000/api/jobs/detail/" +jobId;
  //   axios
  //     .put(api, {companyImage:img})
  //     .then((response) => {
  //       console.log("done", response);
  //       alert("submitDIelet ");
  //     })
  //     .catch((error) => {
  //       console.log("fav ", error);
  //       alert("fav fail");
  //     });
  // }

  return (
    <div
      style={{
        // display: "flex",
        // flexDirection: "column",
        //alignItems: "center",
        // justifyContent: "center",
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{
          display: "none",
        }}
      />
      <div
        style={{
          height: "130px",
          width: "130px",
          border: "1px dashed black",
        }}
      >
        <img
          ref={uploadedImage}
          style={{
            width: "100%",
            height: "100%",
            position: "acsolute",
          }}
        />
      </div>
      <Button onClick={() => imageUploader.current.click()}>
        {" "}
        Click to upload Image
      </Button>
      {/* <button  onClick={submitImage}>Submit Image</button> */}
    </div>
  );
}
