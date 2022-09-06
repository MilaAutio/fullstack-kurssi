const Blog = require('../models/bloglist')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Bridgeton',
        author: 'Lady Whistledown',
        url: 'bridgeton.com',
        likes: '15'
    },
    {
        title: 'My new life in Paris',
        author: 'Emily Cooper',
        url: 'paris.com',
        likes: '12'
    },
]
  
const nonExistingId = async () => {
    const blog = new Blog({
        title: 'Vampire Diaries',
        author: 'Elena Gilbert',
        url: 'mysticfalls.com',
        likes: '17'
    },)
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
}
  
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
  
module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}