const blogsRouter = require('express').Router()
const Blogs = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blogs
      .find({}).populate('user', {name: 1,username: 1})
    response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blogs({
    title: body.title,
    author: body.author,
    url: body.url,
    likes:body.likes,
    user: user
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  if(blog['title'] === undefined || blog['url'] === undefined){
    response.status(400).json()
  }else{
    response.status(201).json(savedBlog.toJSON())
  }
    
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blogs.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async(request, response) =>{
  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = await Blogs.findById(request.params.id)

  if(blog.user.toString() === user.id.toString()){
    await Blogs.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else{
    response.status(401).toJson({error: 'user not authorised to delete blog'})
  }

  
})

blogsRouter.put('/:id', async(request, response) => {
  const body = request.body
  console.log(body)

  const blog = {
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes
  }

  const bloge = await Blogs.findByIdAndUpdate(request.params.id,blog, {new:true})
  console.log(bloge)
  response.json(bloge.toJSON())
})
  
module.exports = blogsRouter