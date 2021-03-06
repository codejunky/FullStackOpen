const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('list helper functions', () => {
    const blogs = [
        {
            id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
        },
        {
            id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5
        },
        {
            id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12
        },
        {
            id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 1
        },
        {
            id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0
        },
        {
            id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2
        }
    ]

    describe('total likes', () => {
        test('of empty list is zero', () => {
            expect(listHelper.totalLikes([])).toBe(0)
        })

        test('when list has only one blog equals the likes of that', () => {
            const blog = blogs[0]

            const likes = listHelper.totalLikes([blog])
            expect(likes).toBe(7)
        })

        test('of a bigger list is calculated right', () => {
            const likes = listHelper.totalLikes(blogs)

            expect(likes).toBe(27)
        })
    })

    describe('favorite blog', () => {
        test('of empty list is empty object', () => {
            expect(listHelper.favoriteBlog([])).toEqual({})
        })

        test('when list has only one blog, it is the favorite', () => {
            const blog = blogs[0]

            const result = listHelper.favoriteBlog([blog])
            expect(result).toEqual(blog)
        })

        test('of bigger list returns blog with most likes', () => {
            const expected = blogs[2]
            const result = listHelper.favoriteBlog(blogs)

            expect(result).toEqual(expected)
        })
    })

    describe('author with most blogs', () => {
        test('of empty list is empty object', () => {
            expect(listHelper.mostBlogs([])).toEqual({})
        })

        test('when list has only one blog, should return who wrote it', () => {
            const blog = blogs[0]
            const expected = {
                author: blog.author,
                blogs: 1
            }

            const result = listHelper.mostBlogs([blog])
            expect(result).toEqual(expected)
        })

        test('of bigger list, should return author with most blogs', () => {
            const expected = {
                author: 'Robert C. Martin',
                blogs: 3
            }

            const result = listHelper.mostBlogs(blogs)
            expect(result).toEqual(expected)
        })
    })

    describe('author with most likes', () => {
        test('of empty list is empty object', () => {
            expect(listHelper.mostLikes([])).toEqual({})
        })

        test('when list has only one blog, should return likes for that blog', () => {
            const blog = blogs[0]
            const expected = {
                author: blog.author,
                likes: blog.likes
            }

            const result = listHelper.mostLikes([blog])
            expect(result).toEqual(expected)
        })

        test('of bigger list should return author with most likes', () => {
            const expected = { author: 'Edsger W. Dijkstra', likes: 17 }

            const result = listHelper.mostLikes(blogs)
            expect(result).toEqual(expected)
        })
    })
})
