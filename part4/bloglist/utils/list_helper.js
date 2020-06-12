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
    const authorBlogCounts = _.countBy(blogs, blog => blog.author)
    return _.reduce(authorBlogCounts, (author, count, name) => {
        if (count > author['blogs'] || _.isEmpty(author)) {
            author = {
                author: name,
                blogs: count
            }
        }

        return author
    }, {})
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}