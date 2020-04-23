import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('Blog component', () => {
  let component;

  beforeEach(() => {
    const deleteBlog = jest.fn();
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'test author',
      url: 'url test',
      likes: 3,
    };
    component = render(<Blog blog={blog} deleteBlog={deleteBlog} />);
  });

  test('at start the first child is displayed', () => {
    const div = component.container.querySelector('.displayNone');

    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view');
    fireEvent.click(button);

    const div = component.container.querySelector('.displayNone');
    expect(div).not.toHaveStyle('display: none');
  });

  //   test('likes of blog is increased by two when button pressed twice', () => {
  //     const handleLike = jest.fn()
  //     const button = component.getByText('Like');

  //     fireEvent.click(button);
  //     fireEvent.click(button);

  //     expect(div).toContain(2)

  //   });
});

test('renders content', () => {
  const deleteBlog = jest.fn();
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test author',
    url: 'url test',
    likes: 3,
  };

  const component = render(<Blog blog={blog} deleteBlog={deleteBlog} />);
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );

  component.debug();
});
