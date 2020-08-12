const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { TestScheduler } = require('jest')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

test('blogs are returned as JSON',async() => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs are returend with id', async() =>{
    const response = await api.get('/api/blogs').expect(200)
    const contents = response.body.map(r => r)

    contents.forEach(element => {
        expect(element['id']).toBeDefined()
    });
})

test('blog can be added', async() =>{
    const newBlog = {
        title:"Turun swenska maailma" ,
        author: "Anu Taukko",
        url: "www.oisihmejosloytyy.fi",
        likes: 75
    }
    const response = await api.get('/api/blogs').expect(200)
    const contents = response.body.map(r => r)

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogs = await Blog.find({})
    blogs.map(blog => blog.toJSON())

    const blogsAtEnd = blogs
    console.log(blogsAtEnd)

    expect(blogsAtEnd).toHaveLength(contents.length + 1)
})

test('when likes not given likes = 0', async() =>{
    const newBlog = {
        title:"Turun nolla maailma" ,
        author: "Pannu Saukko",
        url: "www.kylsätiiätetseloytyy.fi",
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs').expect(200)
    const contents = response.body.map(r => r)

    contents.forEach(element => {
        if (element['author'] === 'Pannu Saukko'){
            expect(element['likes']).toBe(0)
        }
    });
})

test('when title or url not given === 400', async() =>{
    const newBlog = {
        author: "Pannu Saukko",
        url: "www.kylsätiiätetseloytyy.fi",
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})

describe('adding users when there is one user at db',() =>{
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
    
        await user.save()
      })

      const usersInDb = async () => {
        const users = await User.find({})
        return users.map(u => u.toJSON())
      }
    test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
        username: 'miikast',
        name: 'Miika',
        password: 'salainen',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
        username: 'root',
        name: 'SuperAbuser',
        password: 'salainen',
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
  })