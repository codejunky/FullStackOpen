const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require('dotenv').config()

const Person = require('./models/person');

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
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

app.get("/info", (req, res, next) => {
    Person.find({})
        .then(people => {
            const message = `
                <p>Phonebook has info for ${people.length} people</p>
                <p>${new Date().toString()}</p>
            `

            return res.send(message)
        })
        .catch(error => next(error))
})

app.get("/api/persons", (req, res) => {
    Person.find({})
        .then(people => {
            res.json(people)
        })
})

app.get("/api/persons/:id", (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                return res.json(person)
            }

            res.status(404).end()
        })
        .catch(error => next(error))
})

app.post("/api/persons", (req, res) => {
    const { name, number } = req.body

    if (!name || !number) {
        return res.status(400).json({
            error: "Must provide name and number."
        })
    }

    const person = new Person({
        name,
        number
    })

    person.save()
        .then(savedPerson => {
            res.status(201).json(savedPerson)
        })

})

app.put("/api/persons/:id", (req, res, next) => {
    const { name, number } = req.body

    Person.findByIdAndUpdate(req.params.id, { name, number }, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))

})

const unknownEndpoint = (req, res) => {
    return res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: "malformatted id" })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})