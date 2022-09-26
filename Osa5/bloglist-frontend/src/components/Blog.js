/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    maxWidth: 500
  }

  const buttonStyle = {
    float: 'right',
    verticalAlign: 'middle',
    display: 'inline-block'
  }

  const [visibility, setVisibility] = useState(false)

  const addLike = () => {

    const likes = blog.likes + 1

    updateBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes,
      user: blog.user.id
    })
  }

  if(visibility === false) {
    return (
      <div className="blog" style={blogStyle}>
        "{blog.title}" by {blog.author}
        <button className="view-blog-details" style={buttonStyle} onClick={() => setVisibility(!visibility)}>View</button>
      </div>
    )
  } else if( visibility === true && blog.user.name === user.name ) {
    return (
      <div className="blog" style={blogStyle}>
        "{blog.title}" by {blog.author}
        <button style={buttonStyle} onClick={() => setVisibility(!visibility)}>View</button>
        <p>Url: {blog.url}</p>
        <p>Likes: {blog.likes}<button className="like-blog" style={{ marginLeft: 10 }} onClick={addLike}>Like</button></p>
        <p>User: {blog.user.username}</p>
        <button className="delete-blog" onClick={ () => deleteBlog(blog.id, blog.title) }>Delete</button>
      </div>
    )
  } else {
    return (
      <div className="blog" style={blogStyle}>
        "{blog.title}" by {blog.author}
        <button className="view-blog-details" style={buttonStyle} onClick={() => setVisibility(!visibility)}>View</button>
        <p>Url: {blog.url}</p>
        <p>Likes: {blog.likes}<button className="like-blog" style={{ marginLeft: 10 }} onClick={addLike}>Like</button></p>
        <p>User: {blog.user.username}</p>
      </div>
    )
  }
}

export default Blog