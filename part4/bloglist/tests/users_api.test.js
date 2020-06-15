const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

describe('users api', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({
            username: 'root',
            name: 'Oussama Bouguerne',
            passwordHash
        })

        await user.save()
    })

    test('can access users in db', async () => {
        const result = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toHaveLength(1)
    })

    test('new users can be created successfully', async () => {
        const users = await helper.usersInDB()

        const newUser = {
            username: 'ouss',
            name: 'Oussama',
            password: 'secret123'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDB()
        expect(usersAtEnd).toHaveLength(users.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    afterAll(() => {
        mongoose.connection.close()
    })
}) 