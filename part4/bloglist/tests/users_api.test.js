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

    test('cannot create a new user with an existing username', async () => {
        const users = await helper.usersInDB()

        const newUser = {
            username: 'root',
            name: 'Super User',
            password: 'secret123'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDB()
        expect(usersAtEnd).toHaveLength(users.length)
    })

    test('must provide username to successfully create new user', async () => {
        const newUser = {
            name: 'Super User',
            password: 'secret123'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` is required')
    })

    test('username must be at least 3 characters long to successfully create new user', async () => {
        const newUser = {
            username: 'ab',
            name: 'Super User',
            password: 'secret123'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` (`ab`) is shorter than the minimum allowed length (3)')
    })

    test('must provide password to successfully create new user', async () => {
        const newUser = {
            username: 'ouss',
            name: 'Super User',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Password is required')
    })

    test('password must be at least 3 characters long to be valid', async () => {
        const newUser = {
            username: 'ouss',
            name: 'Oussama',
            password: '12'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Password must be at least 3 characters long')
    })

    afterAll(() => {
        mongoose.connection.close()
    })
}) 