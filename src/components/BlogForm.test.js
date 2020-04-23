import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

test('<BlogFrom /> updates parent state and calls onSubmit', () => {
  const addBlog = jest.fn();

  const component = render(<BlogForm addBlog={addBlog} />);

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(title, {
    target: { value: 'testing of forms could be easier' },
  });
  fireEvent.change(author, {
    target: { value: 'test author' },
  });
  fireEvent.change(url, {
    target: { value: 'testurl.com' },
  });
  fireEvent.submit(form);

  expect(addBlog.mock.calls.length).toBe(1);
  console.log(addBlog.mock.calls);
  //console.log(JSON.stringify(createNote.mock.calls[0][0].content, null, 2))
  expect(addBlog.mock.calls[0][0].title).toBe(
    'testing of forms could be easier'
  );
  expect(addBlog.mock.calls[0][0].author).toBe('test author');
  expect(addBlog.mock.calls[0][0].url).toBe('testurl.com');
});
