require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const Project = require('./models/project')

app.use(express.static('build'))
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.post('/api/projects', (request, response, next) => {
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

app.get('/api/projects', (request, response) => {
  Project.find({}).then(projects => {
    response.json(projects)
  })
})

app.delete('/api/projects/:id', (request, response, next) => {
  Project.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/api/projects/:id', (request, response, next) => {
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

app.put('/api/projects/:id', (request, response, next) => {
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})