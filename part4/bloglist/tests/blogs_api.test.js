const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('blogs api', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        const blogs = helper.initialBlogs.map(blog => new Blog(blog))
        const promiseArr = blogs.map(blog => blog.save())
        await Promise.all(promiseArr)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('server transforms blog objects before sending them', async () => {
        const res = await api.get('/api/blogs')

        expect(res.body[0].id).toBeDefined()
    })


    afterAll(() => {
        mongoose.connection.close()
    })
})
