import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import JobDetail from "../JobDetail";
import ListJobDisplay from "../ListJobDisplay";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//temp for listing all jobs 
export default function Job() {
    const [allJobs, setAllJobs] = useState([]);

    //const userId = "pc";

    function cmp(a,b){
        const mp = {
            "Not Started":1,
            "Applied":2,
            "Interview Scheduled":3,
            "Accepted":4,
            "Rejected":5,
        }
        return mp[a["status"]]-mp[b["status"]];
    }

    function findAllJobs() {
        axios.get("/api/favs/")
            .then(response => {    
                response.data.sort(
                    cmp
                );
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
         <div>job Status: {job.status}</div>
        <Link to={"detail/:" + job.jobId}>{job.jobTitle}, {job.location}, {job.companyName}</Link>
        
        </>
        
        )
    })
    return (
        <>
        <h1> These are your Favorite jobs</h1>
        {jobListComponent }
        {/* <ListJobDisplay jobs = {allJobs}/> */}
        </>
    )
}