const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  role: Array,
  time: String,
  imgLink: String,
  srcLink: String,
  viewsLink: String,
  techStack: Array,
})

projectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Project', projectSchema)