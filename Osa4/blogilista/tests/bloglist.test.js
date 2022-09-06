const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/bloglist')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { response } = require('../app')
  
describe('testing bloglist', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salasana', 10)
    const user = new User({ username: 'testi', passwordHash })
    await user.save()
  })
    
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs has field id as identifier field', async () => {
      await api
        .get('/api/blogs')
        .expect(200)

      const response = await api.get('/api/blogs')
      response.body.forEach(element => {
          expect(element.id).toBeDefined
      });

    })

  test('there are two blogs', async () => {
      const response = await api.get('/api/blogs')
    
      expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
    
  test('a specific title is within the returned blogs', async () => {
      const response = await api.get('/api/blogs')

      const title = response.body.map(r => r.title)
    
      expect(title).toContain(
        'My new life in Paris'
      )
  })

  test('a valid blog can be added ', async () => {
      const newBlog = {
          title: 'Black Dagger Brotherhood',
          author: 'Beth',
          url: 'blackdaggerbrotherhood.com',
          likes: '13'
      }

      const user = await api
      .post('/api/login')
      .send( {
        username: 'testi',
        password: 'salasana'
      })

      const token = user._body.token

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
      const titles = blogsAtEnd.map(n => n.title)
      expect(titles).toContain(
        'Black Dagger Brotherhood'
      )
  })

  test('blog without authentication is not added ', async () => {

    const newBlog = {
        title: 'Black Dagger Brotherhood',
        author: 'Beth',
        url: 'blackdaggerbrotherhood.com',
        likes: '13'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

  })
    
  test('blog without title and url is not added', async () => {
      const newBlog = {
          author: 'Beth',
          likes: '13'
      }

      const user = await api
      .post('/api/login')
      .send( {
        username: 'testi',
        password: 'salasana'
      })

      const token = user._body.token
    
      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(400)
    
      const blogsAtEnd = await helper.blogsInDb()
    
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without likes has added 0 likes', async () => {
      const newBlog = {
          title: 'Black Dagger Brotherhood',
          author: 'Beth',
          url: 'blackdaggerbrotherhood.com',
      }

      const user = await api
      .post('/api/login')
      .send( {
        username: 'testi',
        password: 'salasana'
      })

      const token = user._body.token
    
      await api
          .post('/api/blogs')
          .set('Authorization', `bearer ${token}`)
          .send(newBlog)
          .expect(201)
          .expect((res) => {
              res.body.likes = 0
          })
  })

  test('a blog can be deleted', async () => {
      const user = await api
        .post('/api/login')
        .send( {
          username: 'testi',
          password: 'salasana'
      })

      const token = user._body.token

      const newBlog = {
        title: 'Friends',
        author: 'Phoebe Buffay',
        url: 'friends.com',
        likes: '13'
      }

      const post = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)

        const blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd).toHaveLength(
          helper.initialBlogs.length + 1
        )

      const blogToDelete = post._body.id

      console.log(blogToDelete)
    
      await api
        .delete(`/api/blogs/${blogToDelete}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204)
    
      const response = await api.get('/api/blogs')
    
      expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog can be updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const blog = {
          likes: '17'
      }

      const updatedBlog = await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .send(blog)
          .expect(200)

      expect(updatedBlog.body.likes).toBe(17)
  })
})

//users tests
describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salasana', 10)
    const user = new User({ username: 'testi', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '-A.',
      name: 'Pretty Little Liar',
      password: 'secret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testi',
      name: 'Testi Testinen',
      password: 'salasana',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})