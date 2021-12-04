const Schema = require('mongoose').Schema;

exports.JobSchema = new Schema({
    jobTitle: {
        type: String,
    },
    companyName: {
        type: String,
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    },
    employerEmailContact: {
        type: String,
    },
    postingDate: { type: Date, default: Date.now() },
    companyWebsite: {
        type: String,
    },
    status: {
        type: String,
        default: "saved"
    },

}, {
    collection: 'jobs'
})




// const schema = new Schema({
//     name: String,
//     binary: Buffer,
//     isTrue: Boolean,
//     created: { type: Date, default: Date.now() },
//     age: { type: Number, min: 0, max: 65, required: true },
//     mixed: Schema.Types.Mixed,
//     _someId: Schema.Types.ObjectId,
//     array: [],
//     ofString: [String], // Array of a given type
//     map: { stuff: { type: String, lowercase: true, trim: true } }, // Complex objects/nested data
//   })
