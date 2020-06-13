const blogsRouter = require('express').Router()
require('express-async-errors')

const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async ({ body }, response) => {
    const { likes } = body
    if (!likes) {
        body.likes = 0
    }

    const blog = new Blog(body)

    const result = await blog.save()
    response.status(201).json(result)
})

module.exports = blogsRouter