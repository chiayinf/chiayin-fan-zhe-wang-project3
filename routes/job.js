const { response } = require('express');
const express = require('express');
const router = express.Router();
const JobModel = require('./models/Job.Model');
const favoriteModel = require('./models/Favorite.Model');
const jwt = require('jsonwebtoken');
const auth_middleware = require('./auth_middleware.js')

// Returns all Jobs
router.get('/findAllJob', function (request, response) {
  JobModel.getAllJobs()
    .then((JobResponse) => {
      response.status(200).send(JobResponse)
    })
    .catch(error => response.status(400).send(error))
})

router.get('/:jobTitle', (request, response) => {
  const jobTitle = request.params.jobTitle;
  if (!jobTitle) {
    return response.status(422).send("Missing data");
  }

  return JobModel.findJobByJobTitle(jobTitle)
    .then((jobResponse) => {
      if (!jobResponse) {
        response.status(404).send("Job not found");
      }

      response.send(jobResponse)
    })
    .catch((error) => response.status(500).send("Issue getting job"))
})


router.get('/detail/:jobId', (request, response) => {
  const jobId = request.params.jobId;
  if (!jobId) {
    return response.status(422).send("Missing Id");
  }

  return JobModel.findJobByJobId(jobId)
    .then((jobResponse) => {
      //console.log("res for jbid", jobId, jobResponse);
      // if(!jobResponse) {
      //     response.status(404).send("Job not found");
      // }

      response.send(jobResponse)
    })
    .catch(
      (error) =>
        //response.status(500).send("Issue getting job", error)
        response.status(404).send("No job")
    )
})

router.post('/createNewJob',auth_middleware, async function (req, res) {
  const form = req.body;

  //const { jobTitle, companyName, location, description, employerEmailContact, createBy, companyWebsite, companyImage } = req.body;
  form.createBy = req.username;
  // if (!jobTitle) {
  //   return res.status(422).send("Missing jobTitle: " + jobTitle)
  // }
  try {
    const jobResponse = await JobModel.insertJob(form);
    console.log("res", jobResponse);
    return res.status(200).send(jobResponse);
  } catch (error) {
    return res.status(400).send(error);
  }

});


router.put('/detail/:jobId', function (req, res) {
  const jobId = req.params.jobId;
  const { _id,jobTitle, companyName, location, description, employerEmailContact, companyWebsite, companyImage } = req.body;
  if (!jobId) {
    return res.status(422).send("Missing jobId: " + jobId)
  }

  return JobModel.updateJobByJobId(jobId, req.body)
    .then((jobResponse) => {
      console.log("res", jobResponse);
      debugger;
      return res.status(200).send(jobResponse);

    })
    .catch(error => res.status(400).send(error))

});

router.delete('/:jobId', (request, response) => {
  const jobId = request.params.jobId;
  if (!jobId) {
    return response.status(422).send("Missing data");
  }

  return JobModel.deleteJobById(jobId)
    .then((jobResponse) => {
      if (!jobResponse) {
        response.status(404).send("Job not found");
      }

      response.send(jobResponse)
    })
    .catch((error) => response.status(500).send("Issue getting job"))
})


module.exports = router;