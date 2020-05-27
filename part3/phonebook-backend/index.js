const express = require("express")

const app = express()
app.use(express.json())

let people = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    }
]

app.get("/info", (req, res) => {
    const message = `
        <p>Phonebook has info for ${people.length} people</p>
        <p>${new Date().toString()}</p>
    `

    res.send(message)
})

app.get("/api/persons", (req, res) => {
    res.json(people)
})

app.get("/api/persons/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const entry = people.find(p => p.id === id)

    if (!entry) {
        return res.status(404).end()
    }

    res.json(entry)
})

app.post("/api/persons", (req, res) => {
    const person = req.body
    person.id = Math.floor(Math.random(1000) * 1000)
    
    people = people.concat(person)

    res.json(person)
})

app.delete("/api/persons/:id", (req, res) => {
    const id = parseInt(req.params.id)
    people = people.filter(p => p.id !== id)

    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})