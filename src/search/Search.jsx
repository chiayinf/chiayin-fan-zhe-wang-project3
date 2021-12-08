import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import JobDetail from "../JobDetail";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
export default function Search() {

    const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
    const term = urlParams.get('term');
    console.log("t", term);
    const [allJobs, setAllJobs] = useState([]);
    function findAllJobs() {
        axios.get('http://localhost:8000/api/jobs/'+term)
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
        <h1> These are all jobs with your searching key word: {term}</h1>
        {jobListComponent }
        </>
    )
}