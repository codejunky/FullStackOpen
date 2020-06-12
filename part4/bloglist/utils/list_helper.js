const _ = require('lodash')

const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = blogs => {
    return blogs.reduce((acc, blog) => {
        if (blog.likes > acc.likes || !acc.likes) {
            return blog
        }

        return acc
    }, {})
}

const mostBlogs = blogs => {
    return _
        .chain(blogs)
        .countBy(blog => blog.author)
        .reduce((author, count, name) => {
            if (count > author['blogs'] || _.isEmpty(author)) {
                author = {
                    author: name,
                    blogs: count
                }
            }

            return author
        }, {})
        .value()
}

const mostLikes = blogs => {
    return _
        .chain(blogs)
        .groupBy(blog => blog.author)
        .mapValues(blogsArr => {
            return _.reduce(blogsArr, (likesCount, blog) => likesCount + blog.likes, 0)
        })
        .reduce((authorLikes, count, name) => {
            if (count > authorLikes['likes'] || _.isEmpty(authorLikes)) {
                authorLikes = {
                    author: name,
                    likes: count
                }
            }

            return authorLikes
        }, {})
        .value()
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}