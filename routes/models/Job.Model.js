const mongoose = require("mongoose")
const JobSchema = require('../schema/Jobs.Schema').JobSchema

const JobModel = mongoose.model("Job",  JobSchema);

function insertJob(job) {
    return JobModel.create(job);
}

function getAllJobs() {
    return JobModel.find().exec();
}


function deleteJobById(id) {
    return JobModel.findByIdAndDelete().exec();
}

function findJobByJobTitle(jobTitle) {
    return JobModel.findOne({jobTitle}).exec();
}

// Make sure to export a function after you create it!
module.exports = {
    insertJob,
    getAllJobs,
    findJobByJobTitle,
    deleteJobById,
};