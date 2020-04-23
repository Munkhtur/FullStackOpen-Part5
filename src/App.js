import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import { getAll, setToken, create, remove } from './services/blogs';
import { login } from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState('');
  const [user, setUser] = useState('');

  const blogFormRef = React.createRef();
  const notifyWith = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  blogs.sort(function (a, b) {
    if (a.likes > b.likes) {
      return -1;
    }
    if (a.likes < b.likes) {
      return 1;
    }
    return 0;
  });

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const userLogin = async ({ username, password }) => {
    try {
      const user = await login({ username, password });
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      setToken(user.token);
      setUser(user);
      console.log(user.token);
    } catch (error) {
      notifyWith(error.response.data.error, 'error');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser('');
  };
  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    try {
      const createdBlog = await create(newBlog);
      const temp = blogs.concat(createdBlog);
      notifyWith(`${createdBlog.title} by ${createdBlog.author} is created!`);
      setBlogs(temp);
    } catch (error) {
      console.log(error);
      notifyWith(`${error.response.data.error}`, 'error');
    }
  };
  const deleteBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    const answer = window.confirm(`Do you want to delete ${blog.title}?`);

    if (answer) {
      try {
        await remove(id);
        setBlogs(blogs.filter((b) => b.id !== id));
        notifyWith(`${blog.title} is removed`);
      } catch (error) {
        console.log(error.response);
        notifyWith(`${error.response.data.error}`, 'error');
      }
    }
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm userLogin={userLogin} />
      </Togglable>
    );
  };

  const createForm = () => {
    return (
      <Togglable buttonLabel='Create Blog' ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
    );
  };

  return (
    <div>
      <Notification notification={notification} />
      <h2>blogs</h2>
      <p>
        {' '}
        {user.name} logged in{' '}
        {user ? (
          <button className='logout-button' onClick={handleLogout}>
            logout
          </button>
        ) : (
          ''
        )}
      </p>
      {user === '' ? loginForm() : createForm()}
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} />
        ))}
      </div>
    </div>
  );
};

export default App;
