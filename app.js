const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const projectsRouter = require('./controllers/projects')
const achievementsRouter = require('./controllers/achievements')
const experiencesRouter = require('./controllers/experiences')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

// logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/projects', projectsRouter)
app.use('/api/achievements', achievementsRouter)
app.use('/api/experiences', experiencesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app