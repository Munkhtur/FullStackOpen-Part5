import React, { useState } from 'react';
import { update } from '../services/blogs';
import PropTypes from 'prop-types';

const Blog = ({ blog, deleteBlog }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  let userLoggedin;
  const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
  if (loggedUserJSON) {
    userLoggedin = JSON.parse(loggedUserJSON);
  }
  const userBlog = { ...blog.user };
  const loggedUsername = userLoggedin
    ? userLoggedin.username
    : 'someone random';

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async () => {
    const updateBlog = await update(blog.id, {
      ...blog,
      likes: likes + 1,
    });
    setLikes(updateBlog.likes);
  };

  return (
    <div className='bloglist'>
      <div>
        <div style={hideWhenVisible} className='display'>
          {blog.title} {blog.author}
          <button id='view-button' onClick={toggleVisibility}>
            view
          </button>
        </div>
        <div style={showWhenVisible} className='displayNone'>
          {blog.title} {blog.author}
          <p>{blog.url}</p>
          <div className='likeCount'>
            <span className='count'>{likes}</span>
            <button onClick={handleLike}>Like</button>{' '}
          </div>
          <p>{blog.author}</p>
          {userBlog.username === loggedUsername && (
            <button
              className='delete-button'
              onClick={() => deleteBlog(blog.id)}
            >
              delete
            </button>
          )}
        </div>
      </div>
      <div>
        <div style={showWhenVisible}>
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div style={hideWhenVisible}></div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
