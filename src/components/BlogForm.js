import React, { useState } from 'react';

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });
  const { title, author, url } = newBlog;
  const handleCreate = async (e) => {
    e.preventDefault();
    addBlog(newBlog);
    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
    <form onSubmit={handleCreate}>
      <div>
        <h1>Create Blog</h1>
        title
        <input
          id='title'
          type='text'
          value={title}
          name='title'
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, title: target.value })
          }
        />
      </div>
      <div>
        author
        <input
          id='author'
          type='text'
          value={author}
          name='author'
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, author: target.value })
          }
        />
      </div>
      <div>
        url
        <input
          id='url'
          type='text'
          value={url}
          name='url'
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, url: target.value })
          }
        />
      </div>
      <button id='create-button' type='submit'>
        Create
      </button>
    </form>
  );
};

export default BlogForm;
