describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'front root',
      username: 'front root',
      password: '12345',
    };
    const user2 = {
      name: 'test user2',
      username: 'testuser2',
      password: '12345',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.request('POST', 'http://localhost:3001/api/users/', user2);
    cy.visit('http://localhost:3000');
  });

  it('login fails with wrong password', function () {
    cy.contains('login').click();
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    cy.get('.error')
      .should('contain', 'invalid username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');
    cy.get('html').should('not.contain', 'Matti Luukkainen logged in');
  });

  it('front page can be opened', function () {
    cy.contains('blogs');
    cy.contains('HTML is easy');
  });

  it('login form can be opened login and logout', function () {
    cy.contains('login').click();
    cy.get('#username').type('front root');
    cy.get('#password').type('12345');
    cy.get('#login-button').click();
    cy.contains('front root logged in');
    cy.get('.logout-button').click();
    cy.get('html').should('not.contain', 'front root logged in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'front root', password: '12345' });
    });
    it('a new blog can be created', function () {
      cy.get('#title').type('a note created by cypress');
      cy.get('#author').type('user root');
      cy.get('#url').type('password12345');
      cy.get('#create-button').click({ force: true });
      cy.contains('a note created by cypress');
    });
  });

  describe('when a blog exist', () => {
    beforeEach(function () {
      cy.login({ username: 'front root', password: '12345' });
      cy.createBlog({
        title: 'initial test blog command with 0 likes',
        author: 'cypress command one',
        url: 'cy.createBlog',
      });
      cy.createBlog({
        title: 'initial test blog command with 3 likes',
        author: 'cypress command two',
        url: 'cy.createBlog',
        likes: 3,
      });
      cy.createBlog({
        title: 'initial test blog command with 5 likes',
        author: 'cypress command three',
        url: 'cy.createBlog',
        likes: 5,
      });
      cy.logout();
      cy.login({ username: 'testuser2', password: '12345' });
      cy.createBlog({
        title: 'testuser2 blog',
        author: 'test user two',
        url: 'cy.createBlog',
      });
      cy.createBlog({
        title: 'second blog by the user two',
        author: 'cypress command three',
        url: 'cy.createBlog',
      });
    });

    it('user can like blog', () => {
      cy.contains('initial test blog command with 0 likes')
        .find('button')
        .click();
      cy.get('.displayNone')
        .contains('initial test blog command with 0 likes')
        .contains('Like')
        .click();
      cy.get('.likeCount').contains('1');
    });

    it('user can delete a blog of their own', () => {
      cy.contains('testuser2 blog').find('button').click();
      cy.get('.displayNone')
        .contains('testuser2 blog')
        .contains('delete')
        .click();
      cy.get('html').should('contain', 'testuser2 blog is removed');
    });
    it('user can not delete someone elses blog', () => {
      cy.contains('initial test blog command with 0 likes')
        .find('button')
        .click();
      cy.get('.displayNone')
        .contains('initial test blog command with 0 likes')
        .should('not.contain', 'delete');
    });

    it.only('blogs ordered by likes', () => {
      const arr = [];
      cy.get('.bloglist').find('#view-button').click({ multiple: true });
      cy.get('.bloglist').find('.likeCount');
      cy.get('.count').then((c) =>
        c.map((count) => {
          arr.push(count);
          console.log(arr);
        })
      );
    });
  });
});
