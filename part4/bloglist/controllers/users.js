const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User
        .find({})
        .populate('blogs', { user: 0 })

    res.json(users)
})

usersRouter.post('/', async (req, res) => {
    const { body: { username, name, password } } = req

    if (!password) {
        return res
            .status(400)
            .json({
                error: 'Password is required.'
            })
    } else if (password.length < 3) {
        return res
            .status(400)
            .json({
                error: 'Password must be at least 3 characters long to be valid.'
            })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
})


module.exports = usersRouter