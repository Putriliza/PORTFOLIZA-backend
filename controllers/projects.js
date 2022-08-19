const projectsRouter = require('express').Router()
const Project = require('../models/project')

projectsRouter.get('/', (request, response) => {
  Project.find({}).then(projects => {
    response.json(projects)
  })
})

projectsRouter.get('/:id', (request, response, next) => {
  Project.findById(request.params.id)
    .then(project => {
      if (project) {
        response.json(project)
      } else {
        response.status(404).end()
      }
    })
    .catch( () => error => next(error))
})

projectsRouter.post('/', (request, response, next) => {
  const body = request.body

  const project = {
    title: body.title,
    content: body.content,
    start_date: body.start_date,
    end_date: body.end_date,
  }

  project.save()
    .then(savedProject => {
      response.json(savedProject)
    })
    .catch(error => next(error))
})

projectsRouter.delete('/:id', (request, response, next) => {
  Project.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

projectsRouter.put('/:id', (request, response, next) => {
  const { title, content, start_date, end_date } = request.body

  Project.findByIdAndUpdate(
    request.params.id,
    { title, content, start_date, end_date },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedProject => {
      response.json(updatedProject)
    })
    .catch(error => next(error))
})

module.exports = projectsRouter