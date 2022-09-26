const bloglistRouter = require('express').Router()
const Blog = require('../models/bloglist')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { request } = require('../app')

bloglistRouter.get('/', async (req, res) => {
    const blogs = await Blog
		.find({}).populate('user', { username: 1, name: 1, id: 1 })
    res.json(blogs)
})
  
bloglistRouter.post('/', async (req, res ) => {
	const body = req.body
  	const user = req.user

	if(user) {
		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes,
			user: user._id
		})
	
		const savedBlog = await blog.save()
	
		user.blogs = user.blogs.concat(savedBlog._id)
	
		await user.save()
	
		res.status(201).json(savedBlog)
	} else {
		res.status(401).end()
	}
})

bloglistRouter.delete('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id)
	if( !blog ) {
		return res.status(404).json({ error: 'Blog not found' })
	}
	const user = req.user

	if(user) {
		if ( blog.user.toString() === user._id.toString() ) {
			console.log('user found')
			await Blog.findByIdAndRemove(req.params.id)
			res.status(204).end()
		} else {
			console.log('wrong user')
			res.status(401).end()
		}
	} else {
		console.log('wrong user')
		res.status(401).end()
	}
})

bloglistRouter.put('/:id', async (req, res) => {
	const body = req.body

	const blog = {
		title: body.title,
		author: body.author,
        url: body.url,
        likes: body.likes
	}

	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true, runValidators: true, context: 'query' } )
	res.json(updatedBlog)
})

module.exports = bloglistRouter