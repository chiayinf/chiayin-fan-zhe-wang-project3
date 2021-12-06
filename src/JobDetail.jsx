import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';


export default function() {
    const id = useParams().jobId;
    console.log("here", id);

    const [ajob, setAJob] = useState([]);


    function findThatJob() {
        axios.get('http://localhost:8000/api/jobs/detail/' + id)
            .then(response => {
                setAJob(response.data)
            })
            .catch(error => console.error(error));
    }

    useEffect(findThatJob, []);
    console.log("jobs are", ajob.jobTitle);

    // const [job, setjob] = useState(null);
    // useEffect(findjobDetails, []);


    // const jobComponent = job ? 
    //     (<><div>
    //         job Name: {job.name}
    //     </div>
    //     <div>
    //         job Health: {job.health} 
    //     </div></>) :
    //     (<div> No job found </div>);

    return (
        <>
        <div>
        soemthing here


            {/* {jobComponent} */}
        </div>

   <div>
   {ajob.jobTitle}
   </div>
        </>
    )
}