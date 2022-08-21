const mongoose = require('mongoose')

const experienceSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  content: String,
  time: String,
  photoUrl: String,
})

experienceSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Experience', experienceSchema)