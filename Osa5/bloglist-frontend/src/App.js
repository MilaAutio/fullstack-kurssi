import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import PropTypes from 'prop-types'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const createBlogFormRef = useRef()

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  useEffect( () => {
    const showBlogs = async () => {
      const blogList = await blogService.getAll()
      setBlogs( blogList.sort((a, b) => b.likes - a.likes) )
    }
    showBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('error')
      setNotification('Invalid username or password')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const showBlogs = () => (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
      )}
    </div>
  )

  const createBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)

      console.log(blog)
      const blogAsd = blog
      blogAsd.user = {
        id: blog.user,
        username: user.username,
        name: user.name
      }
      setBlogs( blogs.concat(blogAsd) )

      createBlogFormRef.current.toggleVisibility()

      setNotification(`Blog "${newBlog.title}" added succesfully`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    } catch (exception) {
      setNotification('Blog creation failed')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)

      const updatedBlogList = blogs.map(obj => {
        if(obj.id === id) {
          return updatedBlog
        }
        return obj
      })

      setBlogs(updatedBlogList)

      setNotification(`Blog "${updatedBlog.title}" liked!`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    } catch (exception) {
      setNotification('Blog like failed')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  useEffect( () => {
    setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
  }, [blogs])

  const deleteBlog = async (id, title) => {
    try {
      if (window.confirm(`Remove blog "${title}"?`)) {
        await blogService.remove(id)

        setBlogs( current =>
          current.filter(blog => {
            return blog.id !== id
          })
        )

        setNotification(`Blog "${title}" deleted`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }

    } catch (exception) {
      setNotification(`There was an error when trying to remove blog "${title}"`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notification}/>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification}/>
      <p>{user.name} logged in</p>
      <div className="blogs">{showBlogs()}</div>
      <h2>Create blog</h2>
      <Togglable buttonLabel="Create new blog" ref={createBlogFormRef}>
        <CreateBlogForm createBlog={createBlog}></CreateBlogForm>
      </Togglable><br/>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

const Notification = (props) => {
  return (
    <div>
      {props.message}
    </div>
  )
}

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Log in</h2>

      <form onSubmit={handleSubmit} id="login-form">
        <div>
         username
          <input
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
         password
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit">log in</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'


export default App
