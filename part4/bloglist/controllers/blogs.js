const blogsRouter = require('express').Router()
require('express-async-errors')

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.post('/', async ({ body }, response) => {
    const { likes } = body
    if (!likes) {
        body.likes = 0
    }

    const user = await User.findOne({})
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
    await Blog.findByIdAndDelete(req.params.id)
    return res.status(204).end()
})

module.exports = blogsRouter