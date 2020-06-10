const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(-1)
}

const url =
    `mongodb+srv://fullstack:${process.argv[2]}@cluster0-blow3.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name,
        number
    })

    person.save()
        .then(res => {
            console.log('New phone number successfully saved to DB!')
            mongoose.connection.close()
        })

} else {
    Person.find({})
        .then(people => {
            people.forEach(({ name, number }) => {
                console.log("Phonebook:")
                console.log(`${name} ${number}`)
            })

            mongoose.connection.close()
        })
}