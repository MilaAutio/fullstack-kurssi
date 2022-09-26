describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Testi Testinen',
      username: 'testi',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user )

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in').click()
    cy.contains('Log in')
  })

  describe('log in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testi')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Testi Testinen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testi')
      cy.get('#password').type('väärä salasana')
      cy.get('#login-button').click()

      cy.contains('Invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#username').type('testi')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('New blog title')
      cy.get('#author').type('Author')
      cy.get('#url').type('Url.com')
      cy.get('#create-blog').click()

      cy.contains('Blog "New blog title" added succesfully')
      cy.get('.blogs').should('contain', 'New blog title')

    })

  })

  describe('When logged in and blog created', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#username').type('testi')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Create new blog').click()
      cy.get('#title').type('New blog title')
      cy.get('#author').type('Author')
      cy.get('#url').type('Url.com')
      cy.get('#create-blog').click()
    })

    it('Blog can be liked', function() {
      cy.get('.blog').contains('New blog title').as('blog')
      cy.get('@blog').find('.view-blog-details').click()
      cy.get('@blog').find('.like-blog').click()

      cy.get('@blog').contains('Likes: 1')
    })

    it.only('Blog can be deleted', function() {
      cy.get('.blog').contains('New blog title').as('blog')
      cy.get('@blog').find('.view-blog-details').click()
      cy.get('@blog').find('.delete-blog').click()

      cy.get('.blogs').should('not.contain', 'New blog title')
    })
  })

})