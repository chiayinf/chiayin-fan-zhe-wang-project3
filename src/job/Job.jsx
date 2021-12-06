import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import JobDetail from "../JobDetail";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//temp for listing all jobs 
export default function Job() {
    const [allJobs, setAllJobs] = useState([]);


    function findAllJobs() {
        axios.get('http://localhost:8000/api/jobs/findAllJob')
            .then(response => {
                setAllJobs(response.data)
            })
            .catch(error => console.error(error));
    }

    useEffect(findAllJobs, []);
    console.log("jobs are", allJobs);

    const jobListComponent = allJobs.map(job => {

        return (
        <>
        <p></p>
        <Link to={"detail/:" + job._id}>{job.jobTitle}, {job.location}, {job.companyName}</Link>
        
        </>
        
        )
    })
    return (
        <>
        <h1> These are all jobs</h1>
        {jobListComponent }
        </>
    )
}