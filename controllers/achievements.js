const achievementsRouter = require('express').Router()
const Achievement = require('../models/achievement')

achievementsRouter.get('/', (request, response) => {
  Achievement.find({}).then(achievements => {
    response.json(achievements)
  })
})

achievementsRouter.get('/:id', (request, response, next) => {
  Achievement.findById(request.params.id)
    .then(achievement => {
      if (achievement) {
        response.json(achievement)
      } else {
        response.status(404).end()
      }
    })
    .catch( () => error => next(error))
})

achievementsRouter.post('/', (request, response, next) => {
  const body = request.body

  const achievement = {
    position: body.position,
    event: body.event,
    organizer: body.organizer,
    content: body.content,
    date: body.date,
    photoUrl: body.photoUrl,
  }

  achievement.save()
    .then(savedAchievement => {
      response.json(savedAchievement)
    })
    .catch(error => next(error))
})

achievementsRouter.delete('/:id', (request, response, next) => {
  Achievement.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

achievementsRouter.put('/:id', (request, response, next) => {
  const { position, event, organizer, content, date, photoUrl } = request.body

  Achievement.findByIdAndUpdate(
    request.params.id,
    { position, event, organizer, content, date, photoUrl },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedAchievement => {
      response.json(updatedAchievement)
    })
    .catch(error => next(error))
})

module.exports = achievementsRouter