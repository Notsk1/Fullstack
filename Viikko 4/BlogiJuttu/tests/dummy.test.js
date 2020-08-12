const listHelper = require('../utils/list_helper')
const { likes, favoriteBlog } = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const listWithManyBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: "5f106ae59500545c583b6768",
            title: "Turun ihmeellinen maailma",
            author: "Anu Saukko",
            url: "www.eiootaa.fi",
            likes: 3,
            __v: 0
        }
    ]

const listWithOneBlog = [
{
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
}
]

describe('total likes', () =>{
    test('of empty list is zero', () => {
        expect(likes([])).toBe(0)
    })
    

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.likes(listWithOneBlog)
        expect(result).toBe(5)
    })

    
    test('when list has many blogs', () => {
        const result = listHelper.likes(listWithManyBlogs)
        expect(result).toBe(8)
    })

})

describe('favorite blog', () =>{
    test('with no blogs', () =>{
        expect(favoriteBlog([])).toEqual(0)
    })

    test('with one blog', () =>{
        expect(favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
    })

    test('with many blogs', () =>{
        expect(favoriteBlog(listWithManyBlogs)).toEqual(listWithManyBlogs[0])
    })
})