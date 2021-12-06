import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ReactHtmlParser from 'react-html-parser'; 
import {Navigate} from 'react-router-dom';


export default function() {
    const id = useParams().jobId;
    console.log("here", id);

    const [job, setAJob] = useState([]);


    function findThatJob() {
        axios.get('http://localhost:8000/api/jobs/detail/' + id)
            .then(response => {
                setAJob(response.data)
            })
            .catch(error => console.error(error));
    }

    useEffect(findThatJob, []);
    console.log("jobs are", job.jobTitle);



function onDeleteClick() {
    axios
      .delete("http://localhost:8000/api/jobs/"+id)
      .then((response) => {
        console.log(" delete done");
        alert("delete succeed")
        return <Navigate to='/job' />

      })
      .catch((error) => {
        console.log("delete fail", error);
        alert("delete fail")
      });
  }


    const jobComponent = job ? 
        (<><div>
            job Name: {job.jobTitle}
        </div>
        <div>
            Company name: {job.companyName} 
        </div>
                <div>
            Location: {job.location} 
        </div>
                <div>
            Description: 
            <div>{ ReactHtmlParser (job.description) }</div>
        </div>
                        <div>
           Employer email contact: {job.employerEmailContact} 
        </div>
                        <div>
            CompanyWebsite: {job.companyWebsite} 
        </div>
                                <div>
            Posting date: {job.postingDate} 
        </div>
                                        <div>
            Action status: {job.status} 
        </div>
        




        </>) :
        (<div> No job found </div>); //shouldn't see this 

    return (
        <>
        
        <h1>
        Here is the detail page
        </h1>

          {jobComponent} 
        
        <button >Edit</button>
        <button onClick={onDeleteClick}>Delete</button>
        </>
    )
}