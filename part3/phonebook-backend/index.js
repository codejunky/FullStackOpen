const express = require("express")
const morgan = require("morgan")

const app = express()
app.use(express.json())
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))

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
    const nameExists = people.find(p => p.name === person.name)
    person.id = Math.floor(Math.random(1000) * 1000)

    if (!person.name || !person.number) {
        return res.status(400).json({
            error: "Must provide name and number."
        })
    } else if (nameExists) {
        return res.status(400).json({
            error: "name must be unique."
        })
    }

    people = people.concat(person)

    res.status(201).json(person)
})

app.delete("/api/persons/:id", (req, res) => {
    const id = parseInt(req.params.id)
    people = people.filter(p => p.id !== id)

    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})