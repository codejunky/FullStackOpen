const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const { set } = require('../app')

const api = supertest(app)

describe('blogs api', () => {
    let token

    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({
            username: 'ouss',
            name: 'Oussama',
            passwordHash
        })

        await user.save()

        const blogs = helper.initialBlogs.map(blog => {
            blog.user = user._id
            return new Blog(blog)
        })
        const promiseArr = blogs.map(blog => blog.save())
        await Promise.all(promiseArr)

        const data = await api
            .post('/api/login')
            .send({
                username: 'ouss',
                password: 'secret123'
            })

        token = data.body.token
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

    test('can create blog entry successfully if user logged in', async () => {
        const newBlog = {
            title: 'How to become a web developer in 2020',
            author: 'Oussama Bouguerne',
            url: 'http://example.com/how-to-become-a-web-dev',
            likes: 54
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const blogs = await helper.blogsInDB()
        const titles = blogs.map(blog => blog.title)

        expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain('How to become a web developer in 2020')

    })

    test('can not create new blog if auth token not provided', async () => {
        const newBlog = {
            title: 'How to become a web developer in 2020',
            author: 'Oussama Bouguerne',
            url: 'http://example.com/how-to-become-a-web-dev',
            likes: 54
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)


        const blogs = await helper.blogsInDB()

        expect(blogs).toHaveLength(helper.initialBlogs.length)

    })

    test('number of likes is set to 0 if not provided', async () => {
        const newBlog = {
            title: 'How to become a web developer in 2020',
            author: 'Oussama Bouguerne',
            url: 'http://example.com/how-to-become-a-web-dev'
        }

        const result = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(result.body.likes).toBe(0)
    })

    test('blog without url and/or title is not added', async () => {
        const newBlog = {
            author: 'Oussama Bouguerne',
            likes: 45
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)

        const blogs = await helper.blogsInDB()
        expect(blogs).toHaveLength(helper.initialBlogs.length)
    })

    test('blog can be deleted if a valid id is provided', async () => {
        const blogs = await helper.blogsInDB()

        await api
            .delete(`/api/blogs/${blogs[0].id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAfterDeletion = await helper.blogsInDB()
        expect(blogsAfterDeletion).toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAfterDeletion.map(blog => blog.title)
        expect(titles).not.toContain(blogs[0].title)
    })

    test('blog can be updated', async () => {
        const blogs = await helper.blogsInDB()
        const blogToUpdate = blogs[0]
        blogToUpdate.likes = 10

        const result = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(result.body.likes).toBe(10)
    })

    afterAll(() => {
        mongoose.connection.close('How to become a web developer in 2020')
    })

})
