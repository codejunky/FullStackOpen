const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')

const api = supertest(app)

describe('blogs api', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })


    afterAll(() => {
        mongoose.connection.close()
    })
})
