const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://putriliza:${password}@putriliza.qyp19vn.mongodb.net/portfoliza?retryWrites=true&w=majority`

const projectSchema = new mongoose.Schema({
  title: String,
  content: String,
  start_date: Date,
  end_date: Date,
})

const Project = mongoose.model('Project', projectSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const project = new Project({
      title: "WhyNotSearch - Folder Crawling",
      content: "A desktop application to search file or folder (s) using BFS and DFS algorithms using C# with .NET and MSAGL. This app can search for matching files from parent directory until first/all files are found or no files are found if none exists.",
      start_date: new Date(2020, 1, 1),
      end_date: new Date(2020, 1, 2),
    })

    return project.save()
  })
  .then(() => {
    console.log('project saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))