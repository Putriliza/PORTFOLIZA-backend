const experiencesRouter = require('express').Router()
const Experience = require('../models/experience')

experiencesRouter.get('/', (request, response) => {
  Experience.find({}).then(experiences => {
    response.json(experiences)
  })
})

experiencesRouter.get('/:id', (request, response, next) => {
  Experience.findById(request.params.id)
    .then(experience => {
      if (experience) {
        response.json(experience)
      } else {
        response.status(404).end()
      }
    })
    .catch( () => error => next(error))
})

experiencesRouter.post('/', (request, response, next) => {
  const body = request.body

  const experience = {
    position: body.position,
    organization: body.organization,
    content: body.content,
    time: body.time,
    photoUrl: body.photoUrl,
  }

  experience.save()
    .then(savedExperience => {
      response.json(savedExperience)
    })
    .catch(error => next(error))
})

experiencesRouter.delete('/:id', (request, response, next) => {
  Experience.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

experiencesRouter.put('/:id', (request, response, next) => {
  const { position, organization, content, time, photoUrl } = request.body

  Experience.findByIdAndUpdate(
    request.params.id,
    { position, organization, content, time, photoUrl },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedExperience => {
      response.json(updatedExperience)
    })
    .catch(error => next(error))
})

module.exports = experiencesRouter