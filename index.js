const express = require('express')
const app = express()
const cors = require('cors')

let projects = [
  {
      id: 1,
      title: "DNA pattern matching",
      content: "A Website to check if a patient is indicated having a disease based on their DNA sequence, built with ReactJS (front-end), NodeJs (back-end), PostgreSQL (database) loaded in Heroku.",
      start_date: "2022-07-01T00:00:00.000Z",
      end_date: "2022-08-01T00:00:00.000Z"
  },
  {
      id: 2,
      title: "Image Compression",
      content: "An interactive website to compress image built with Vue and Flask that accept input image files with various formats and the desired level of image compression. This website will display the input image, the output image, the run time, and the percentage compression results. User also allowed to download the result.",
      start_date: "2022-07-01T00:00:00.000Z",
      end_date: "2022-08-01T00:00:00.000Z"
  },
  {
      id: 3,
      title: "WhyNotSearch - Folder Crawling",
      content: "A desktop application to search file or folder (s) using BFS and DFS algorithms using C# with .NET and MSAGL. This app can search for matching files from parent directory until first/all files are found or no files are found if none exists.",
      start_date: "2022-07-01T00:00:00.000Z",
      end_date: "2022-08-01T00:00:00.000Z"
  }
]


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())

app.use(requestLogger)

app.use(cors())

app.use(express.static('build'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})


app.post('/api/projects', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const project = {
    title: body.title,
    content: body.content,
    start_date: body.start_date,
    end_date: body.end_date,
    id: +new Date(),
  }

  projects = projects.concat(project)

  response.json(project)
})

app.get('/api/projects', (req, res) => {
  res.json(projects)
})

app.delete('/api/projects/:id', (request, response) => {
  const id = Number(request.params.id)
  projects = projects.filter(project => project.id !== id)

  response.status(204).end()
})

app.get('/api/projects/:id', (request, response) => {
  const id = Number(request.params.id)
  const project = projects.find(project => project.id === id)

  if (project) {
    response.json(project)
  } else {
    response.status(404).end()
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})