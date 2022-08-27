const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://putriliza:${password}@putriliza.qyp19vn.mongodb.net/portfoliza?retryWrites=true&w=majority`

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  role: Array,
  time: String,
  imgLink: String,
  srcLink: String,
  viewsLink: String,
  techStack: Array,
})

const Project = mongoose.model('Project', projectSchema)

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

const Achievement = mongoose.model('Achievement', achievementSchema)

const experienceSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  content: String,
  role: Array,
  time: String,
  imgLink: String,
  igLink: String,
  webLink: String,
})

const Experience = mongoose.model('Experience', experienceSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    // const achievement = new Achievement({
    //   position: '2nd Place',
    //   event: 'ABU Robot Contest Indonesia (KRAI) 2022',
    //   organizer: 'Kemdikbud - Puspresnas',
    //   content: 'KRAI 2022 is part of the biggest robot contest in Indonesia to select representatives at International contest, with the theme “Lagori”, a traditional Indian game. We won 2nd place by defeating dozens of colleges in Indonesia.',
    //   date: new Date('2022-07-03'),
    //   imgLink: '/assets/achievement/KRAI_2022.JPG',
    //   techStack: ['C++', 'Python', 'Mbed', 'ROS', 'OpenCV']
    // })

    // const achievement = new Achievement({
    //   position: 'Best Top 3 Team',
    //   event: 'HACKFEST 2022',
    //   organizer: 'Google Developer Students Club Indonesia',
    //   content: 'HackFest is a competitive event to develop tech solutions to solve one or more of the 17 SDGs. We develop “Approkes”, a sensory-based application with mask detection to check implementation of COVI-19 Health Protocols. My team also won 3 of 6 special categories (“Best Video Demo”, “Best Presentation, and “Best Pitch Deck”).',
    //   date: new Date('2022-03-26'),
    //   imgLink: '/assets/achievement/hackfest.png',
    //   techStack: ['Python', 'Javascript', 'OpenCV', 'Tensorflow', 'Arduino', 'Google Cloud']
    // })

    // return achievement.save()

    // const experience = new Experience({
    //     position: 'Vice Head of Marketing',
    //     organization: 'Inkubator IT HMIF ITB 2022',
    //     content: 'A business entity under the auspices of HMIF (Himpunan Mahasiswa Informatika) ITB which serves consulting services and various request of IT-based products such as web app, desktop app, mobile app, and bot.',
    //     role: ["Responsible in increasing sales of Inkubator IT through brand awareness marketing.", "Manage all social media of Inkubator IT to reach potential clients.", "Prepare content for advertising and partnerships with external parties." ],
    //     time: 'Mei 2022 - Present',
    //     imgLink: '/assets/experience/iit.png',
    //     igLink: 'https://www.instagram.com/inkubatorit/',
    //     webLink: 'https://inkubatorit.com/',
    // })

    // const experience = new Experience({
    //   position: 'Control Crew',
    //   organization: 'Robotics Unit (URO) ITB - Garudago Team (KRAI)',
    //   content: 'A Student Activity Unit in ITB that focused on developing robots to compete in Robot Contest Indonesia (KRI).',
    //   role: ["Responsible to develop mechanism for ball launcher.", "Do research on object detection for robot vision.", "Secretary and treasure in SEKURO 2022 (Robotics Training and Crew Regeneration)" ],
    //   time: 'August 2021 - August 2022',
    //   imgLink: '/assets/experience/uro.jpeg',
    //   igLink: '',
    //   webLink: '',
    // })

    // const experience = new Experience({
    //   position: 'Creative Officer',
    //   organization: 'IEEE ITB Student Branch',
    //   content: 'IEEE (Institute of Electrical and Electronics Engineer) is the world’s largest technical professional organization dedicated to advancing technology for the benefit of humanity. The core purpose is to foster technological innovation as one of the IEEE’s student branches.',
    //   role: ['In charge as Creative Director in IEEEngage "Uncover the Truth: Behind Consulting and Tech Companies", a charity-webinar event that uncovers the rumors surrounding top-tier consulting and tech companies.  Responsible for managing the graphic design and video content, including Instagram feeds, poster, and teaser.'],
    //   time: 'April 2021 - March 2022',
    //   imgLink: '/assets/experience/ieee.png',
    //   igLink: 'https://www.instagram.com/ieeeitbsb/',
    //   webLink: '',
    // })

    // const experience = new Experience({
    //   position: 'Web Development Competition Officer',
    //   organization: 'Mile Zero Project 2.0',
    //   content: 'Mile Zero Project is a series of events that marks mile zero of human civilization in building a new cultural order that was hit hard by the COVID-19 Pandemic.',
    //   role: ['Plan the needs of the competition, including proposals, guidelines, etc.', 'Organize the event details (training and pitching stage of the competition)', 'Best Staff on August-September'],
    //   time: 'Mei 2021 - Feb 2022',
    //   imgLink: '/assets/experience/mzp.png',
    //   igLink: '',
    //   webLink: 'https://milezeroproject.com/',
    // })

    // const experience = new Experience({
    //   position: 'Creative Staff',
    //   organization: 'BPA STEI 2020',
    //   content: 'School of Elector and Informatics (STEI) is one of the schools (faculty) at the Bandung Institute of Technology, with about 500 students in the class of 2020. I participated as creative staff at my first year as STEI student.',
    //   role: ['Design contents for publication needs through social media'],
    //   time: 'December 2020 - Mei 2021',
    //   imgLink: '/assets/experience/bpa-stei.png',
    //   igLink: 'https://www.instagram.com/stei20itb/',
    //   webLink: '',
    // })

    // const experience = new Experience({
    //   position: 'Graphic Design Manager',
    //   organization: 'IMPACT 2021',
    //   content: 'MPACT 2.0 is a Mathematics, Physics, and Information Competition held by STEI ITB 2020 aimed at High School students in Indonesia. I was directly responsible under the creative director for managing the graphic design needs for this competition.',
    //   role: ['Manage task and timeline for the graphic design team', 'Design contents for publication needs through social media'],
    //   time: 'March 2021 - July 2021',
    //   imgLink: '/assets/experience/mzp.png',
    //   igLink: 'https://www.instagram.com/impact_itb/',
    //   webLink: '',
    // })
    
  

    // return experience.save()

    // const project = new Project({
    //   title: "DNA Pattern Matching",
    //   content: "A Website to check if a patient is indicated having a disease based on their DNA sequence, built with ReactJS (front-end), NodeJs (back-end), PostgreSQL (database) loaded in Heroku." ,
    //   role: ["Develop backend with string matching algorithm, using Knuth-Morris-Pratt algorithm, Boyer-Moore algorithm, and also Longest Common Subsequence algorithm to calculate the rate of similarity"],
    //   time: "April 2022",
    //   imgLink: "/assets/experience/ieee.png",
    //   srcLink: "https://github.com/Putriliza/DNA-Pattern-Matching",
    //   viewsLink: "https://dna-tester.netlify.app",
    //   techStack: ["ReactJS", "NodeJS", "PostgreSQL", "Heroku"],
    // })

    // const project = new Project({
    //   title: "Image Compression",
    //   content: "An interactive website to compress image built with Vue and Flask that accept input image files with various formats and the desired level of image compression. This website will display the input image, the output image, the run time, and the percentage compression results. User also allowed to download the result." ,
    //   role: ["Develop backend for compression with Singular Value Decomposition algorithm."],
    //   time: "April 2022",
    //   imgLink: "/assets/experience/ieee.png",
    //   srcLink: "https://github.com/Putriliza/DNA-Pattern-Matching",
    //   viewsLink: "https://dna-tester.netlify.app",
    //   techStack: ["Vue", "Flask"],
    // })

    // const project = new Project({
    //   title: "WhyNotSearch - Folder Crawling",
    //   content: "A desktop application to search file or folder (s) using BFS and DFS algorithms using C# with .NET and MSAGL. This app can search for matching files from parent directory until first/all files are found or no files are found if none exists." ,
    //   role: ["UI/UX designer", "Application frontend developer"],
    //   time: "March 2022",
    //   imgLink: "/assets/experience/ieee.png",
    //   srcLink: "https://github.com/Putriliza/Tubes2_13520066",
    //   viewsLink: "",
    //   techStack: ["C#", ".NET", "MSAGL"],
    // })

    // const project = new Project({
    //   title: "Menkrep - Card Board Game",
    //   content: "A turn-based card board game for 2 players with Object oriented approach, built Java and JavaFX GUI. The goal is to reduce the enemy's health to zero by attacking the enemy's cards." ,
    //   role: ["Implements object orientation classes for Spell Card, Lvl, Potion, Morph, Swap", "GUI: Bind Deck, Mana, Hand Card and Hover Card details (description and stats)", "Testing with JUnit"],
    //   time: "April 2022",
    //   imgLink: "/assets/project/card-game.mp4",
    //   srcLink: "https://github.com/Putriliza/IF2210_TB_03_02",
    //   viewsLink: "",
    //   techStack: ["Java", "JavaFX", "Gradle"],
    // })

    const project = new Project({
      title: "Borahae - Portfolio Front-End",
      content: "A simple portfolio website that provides information about Kim Tae Hyung of BTS. The design and impentation of this website all done by myself.",
      role: [],
      time: "August 2021",
      imgLink: "/assets/project/borahae.mp4",
      srcLink: "https://github.com/Putriliza/borahae",
      viewsLink: "https://putriliza.github.io/borahae/",
      techStack: ["HTML", "CSS", "JS", "Bootstrap"],
    })

    // const project = new Project({
    //   title: "OBHcombi - Remake Front-End",
    //   content: "",
    //   role: [],
    //   time: "August 2022",
    //   imgLink: "/assets/project/obhcombi.mp4",
    //   srcLink: "https://github.com/Putriliza/borahae",
    //   viewsLink: "https://putriliza.github.io/borahae/",
    //   techStack: ["HTML", "CSS", "JS"],
    // })

    // const project = new Project({
    //   title: "Trello - Remake Front-End",
    //   content: "",
    //   role: [],
    //   time: "August 2022",
    //   imgLink: "/assets/project/trello.mp4",
    //   srcLink: "https://github.com/Putriliza/borahae",
    //   viewsLink: "https://putriliza.github.io/borahae/",
    //   techStack: ["HTML", "CSS", "JS"],
    // })
  

    // const project = new Project({
    //   title: "Todolist App - Front-End",
    //   content: "",
    //   role: [],
    //   time: "August 2022",
    //   imgLink: "/assets/project/todolist.mp4",
    //   srcLink: "https://github.com/Putriliza/borahae",
    //   viewsLink: "https://putriliza.github.io/borahae/",
    //   techStack: ["HTML", "CSS", "JS"],
    // })

    // const project = new Project({
    //   title: "Note App - Front-End",
    //   content: "",
    //   role: [],
    //   time: "August 2022",
    //   imgLink: "/assets/project/noteapp.mp4",
    //   srcLink: "https://github.com/Putriliza/borahae",
    //   viewsLink: "https://putriliza.github.io/borahae/",
    //   techStack: ["HTML", "CSS", "JS"],
    // })

    // const project = new Project({
    //   title: "Bookshelf - Front-End",
    //   content: "",
    //   role: [],
    //   time: "August 2022",
    //   imgLink: "/assets/project/bookshelf.mp4",
    //   srcLink: "https://github.com/Putriliza/borahae",
    //   viewsLink: "https://putriliza.github.io/borahae/",
    //   techStack: ["HTML", "CSS", "JS"],
    // })

    return project.save()

  })
  .then(() => {
    console.log('saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))