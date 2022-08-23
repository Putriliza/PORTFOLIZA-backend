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
    time: body.time,
    imgLink: body.imgLink,
    srcLink: body.srcLink,
    viewsLink: body.viewsLink,
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
  const { title, content, time, imgLink, srcLink, viewsLink } = request.body

  Project.findByIdAndUpdate(
    request.params.id,
    { title, content, time, imgLink, srcLink, viewsLink },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedProject => {
      response.json(updatedProject)
    })
    .catch(error => next(error))
})

module.exports = projectsRouter