import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, queryByAttribute } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlog from './CreateBlogForm'

test('renders content', () => {
  const blog = {
    author: 'Testi',
    id: '12345',
    likes: '3',
    title: 'Testiblogi',
    url: 'testi.com',
    user: {
      username: 'Testi',
      name: 'Testi Testinen',
      id: '4321'
    }
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('"Testiblogi" by Testi')
  expect(element).toBeDefined()

  expect( screen.queryByText('Url: testi.com')).not.toBeInTheDocument()
  expect( screen.queryByText('Likes: 3')).not.toBeInTheDocument()

  //screen.debug()

})

test('clicking the button view shows url and likes', async () => {
  const blog = {
    author: 'Testi',
    id: '12345',
    likes: '3',
    title: 'Testiblogi',
    url: 'testi.com',
    user: {
      username: 'Testi',
      name: 'Testi Testinen',
      id: '4321'
    }
  }

  const currentUser = {
    username: 'Testi',
    name: 'Testi Testinen',
    id: '4321'
  }

  render(
    <Blog blog={blog} user={currentUser} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  expect( screen.queryByText('Url: testi.com')).toBeDefined()
  expect( screen.queryByText('Likes: 3')).toBeDefined()

  screen.debug()

})

test('two events when clicked likes button twice', async () => {
  const blog = {
    author: 'Testi',
    id: '12345',
    likes: '3',
    title: 'Testiblogi',
    url: 'testi.com',
    user: {
      username: 'Testi',
      name: 'Testi Testinen',
      id: '4321'
    }
  }

  const currentUser = {
    username: 'Testi',
    name: 'Testi Testinen',
    id: '4321'
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} user={currentUser} updateBlog={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)


  screen.debug()

})

test('create blog with right values', async () => {

  const user = userEvent.setup()
  const createBlog = jest.fn()

  const dom = render(
    <CreateBlog createBlog={createBlog} />
  )

  const getById = queryByAttribute.bind(null, 'id')

  const title = getById(dom.container, 'title')
  const author = getById(dom.container, 'author')
  const url = getById(dom.container, 'url')
  const sendButton = screen.getByText('Create Blog')

  await user.type(title, 'Testiblogi')
  await user.type(author, 'Testi Testinen')
  await user.type(url, 'testi.com')

  await user.click(sendButton)

  expect(createBlog.mock.calls[0][0].title).toBe('Testiblogi')
  expect(createBlog.mock.calls[0][0].author).toBe('Testi Testinen')
  expect(createBlog.mock.calls[0][0].url).toBe('testi.com')

  screen.debug()

})