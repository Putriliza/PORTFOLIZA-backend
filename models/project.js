const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  start_date: Date,
  end_date: Date,
})

projectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Project', projectSchema)