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

    test('can create blog entry successfully', async () => {
        const newBlog = {
            title: 'How to become a web developer in 2020',
            author: 'Oussama Bouguerne',
            url: 'http://example.com/how-to-become-a-web-dev',
            likes: 54
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const blogs = await Blog.find({})
        const titles = blogs.map(blog => blog.title)

        expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain('How to become a web developer in 2020')

    })

    test('number of likes is set to 0 if not provided', async () => {
        const newBlog = {
            title: 'How to become a web developer in 2020',
            author: 'Oussama Bouguerne',
            url: 'http://example.com/how-to-become-a-web-dev'
        }

        const result = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(result.body.likes).toBe(0)
    })


    afterAll(() => {
        mongoose.connection.close('How to become a web developer in 2020')
    })
})