const mongoose = require('mongoose')

const achievementSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  organizer: String,
  content: String,
  date: Date,
  imgLink: String,
  techStack: Array,
})

achievementSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Achievement', achievementSchema)