const mongoose = require("mongoose")
const JobSchema = require('../schema/Jobs.Schema').JobSchema

const JobModel = mongoose.model("Job",  JobSchema);

function insertJob(job) {
    console.log("jb is ",job);
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

function findJobByJobId(id) {
    return JobModel.findById({id}).exec();
}

// function updateJobByJobId(id, job) {
//     return JobModel.findByIdAndUpdate({id}).exec();
// }

// Make sure to export a function after you create it!
module.exports = {
    insertJob,
    getAllJobs,
    findJobByJobTitle,
    deleteJobById,
};