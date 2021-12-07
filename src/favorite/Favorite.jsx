import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import JobDetail from "../JobDetail";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//temp for listing all jobs 
export default function Job() {
    const [allJobs, setAllJobs] = useState([]);

    const userId = "pc";
    function findAllJobs() {
        axios.get("http://localhost:8000/api/favs/"+userId)
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
        <Link to={"detail/:" + job.jobId}>{job.jobTitle}, {job.location}, {job.companyName}</Link>
        
        </>
        
        )
    })
    return (
        <>
        <h1> These are all Favorite jobs for you</h1>
        {jobListComponent }
        </>
    )
}