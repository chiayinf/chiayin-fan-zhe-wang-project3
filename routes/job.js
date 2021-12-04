const { response } = require('express');
const express = require('express');
const router = express.Router();
const JobModel = require('./models/Job.Model');
const jwt = require('jsonwebtoken');
const auth_middleware = require('./auth_middleware.js')

// Returns all Jobs
router.get('/findAllJob', function(request, response) {
    JobModel.getAllJobs()
        .then((JobResponse) => {
            response.status(200).send(JobResponse)
        })  
        .catch(error => response.status(400).send(error))
})

router.get('/:jobname', (request, response) => {
  const jobname = request.params.jobname;
  if(!jobname) {
    return response.status(422).send("Missing data");
  }
  
  return JobModel.findJobByJobName(jobname)
    .then((jobResponse) => {
        if(!jobResponse) {
            response.status(404).send("Job not found");
        }

        response.send(jobResponse)
    })
    .catch((error) => response.status(500).send("Issue getting job"))
})



router.post('/createNewJob', function(req, res) {
    const { jobTitle, compayName,location, description, employerEmailContact, companyWebsite } = req.body;
    if (!jobTitle) {
        return res.status(422).send("Missing jobname: " + jobTitle )
    }



    return JobModel.insertJob({jobTitle, compayName,location, description, employerEmailContact, companyWebsite})
        .then((jobResponse) => {
                return res.status(200).send(jobResponse);

        })
        .catch(error => res.status(400).send(error))

});

module.exports = router;