const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
require('express-async-errors')

const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const { body, token } = request
    const { likes } = body
    if (!likes) {
        body.likes = 0
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response
            .status(401)
            .send({
                error: 'token missing or invalid'
            })
    }

    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        ...body,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
    const { body: { title, author, url, likes } } = req

    const blog = {
        title,
        author,
        url,
        likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(updatedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!req.token || !decodedToken.id) {
        return res
            .status(401)
            .send({
                error: 'Token missing or invalid'
            })
    } else if (blog.user.toString() !== decodedToken.id.toString()) {
        return res
            .status(401)
            .send({
                error: 'You are not authorized to delete this blog'
            })
    }

    await Blog.deleteOne({ _id: blog._id })
    return res.status(204).end()
})

module.exports = blogsRouter