import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Favorite() {
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
        return (<>
        <p></p>
        <Link to={"" + job._id}>{job.jobTitle}</Link>
        </>)
    })
    return (
        <>
        <h1> Favorite</h1>
        {jobListComponent }
        </>
    )
}