const express = require('express')
const app = express()

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

// Use express json to parse the body of incoming requests into a javascript object.
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hello World!!</h1>')
})

/**
 * In a RESTful API every RESOURCE has an associated URL which is the resource's unique address.
 * HTTP verbs define the operation to be executed on a resource:
 * GET - fetches a single resource (/notes/10)
 * GET - fetches all resources in the collection (/notes)
 * DELETE - removes the identified resource (/notes/10)
 * PUT - replaces the entire identified resource with the request data (/notes/10)
 * PATCH - replaces a part of the identified resource with the request data (/notes/10)
 * 
 * REST defines a UNIFORM RESOURCE which is a consistent way of defining interfaces for systems to cooperate.
 * 
 * Some people would argue this is actual RESOURCE-ORIENTED ARCHITECTURE and not REST by definition.
 */
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id
  const note = notes.find(note => String(note.id) === id)
  
  if(note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

// Some people say that delete should return 404 if resource is not found. We will just use 204 if deleted or not found.
app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)

  res.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0

  return maxId + 1
}

// When sending a post request with content in the body, content-type header should be application/json
app.post('/api/notes', (req, res) => {
  const body = req.body

  if(!body.content) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId()
  }
  
  // Immutable update notes
  notes = notes.concat(note)

  res.json(note)
})

const PORT = 3001
app.listen(PORT,  () => {
  console.log(`Server is running on port ${PORT}`)
})