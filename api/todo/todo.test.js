var app = require('../../app');
var request = require('supertest');
var chai = require('chai');

global.expect = chai.expect;
global.assert = chai.assert;
chai.should();

var newTodo;

describe('Todo API:', function() {
  describe('GET /api/todo', function() {
    var todo;

    beforeEach(function(done) {
      request(app)
        .get('/api/todo')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          todo = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(todo).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/todo', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/todo')
        .send({
          title: 'New Todo',
          content: 'This is new todo'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newTodo = res.body;
          done();
        });
    });

    it('should respond with the newly created todo', function() {
      expect(newTodo.title).to.equal('New Todo');
      expect(newTodo.content).to.equal('This is new todo');
    });
  });

  describe('GET /api/todo/search', function() {
    var todo;
    beforeEach(function(done) {
      request(app)
        .get('/api/todo/search')
        .query({
          q: 'is new todo',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          todo = res.body[0];
          done();
        });
    });

    afterEach(function() {
      todo = {};
    });

    it('should respond with the searched todo', function() {
      expect(todo.title).to.equal('New Todo');
      expect(todo.content).to.equal('This is new todo');
    });
  });

  describe('GET /api/todo/:id', function() {
    var todo;

    beforeEach(function(done) {
      request(app)
        .get(`/api/todo/${newTodo.id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          todo = res.body[0];
          done();
        });
    });

    afterEach(function() {
      todo = {};
    });

    it('should respond with the requested todo', function() {
      expect(todo.title).to.equal('New Todo');
      expect(todo.content).to.equal('This is new todo');
    });
  });

  describe('GET /api/todo/list/active', function() {
    var todo;

    beforeEach(function(done) {
      request(app)
        .get(`/api/todo/list/active`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          todo = res.body;
          done();
        });
    });

    afterEach(function() {
      todo = {};
    });

    it('should respond with the requested active todo', function() {
      expect(todo).to.have.length.at.least(1);
    });
  });

  describe('PUT /api/todo/:id/done', function() {
    var todo;

    beforeEach(function(done) {
      request(app)
        .put(`/api/todo/{newTodo.id}/done`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          todo = res.body;
          done();
        });
    });

    afterEach(function() {
      todo = {};
    });

    it('should respond with the requested todo is done', function() {
      expect(todo.state).to.be.true;
    });
  });

  describe('GET /api/todo/list/done', function() {
    var todo;

    beforeEach(function(done) {
      request(app)
        .get(`/api/todo/list/done`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          todo = res.body;
          done();
        });
    });

    afterEach(function() {
      todo = {};
    });

    it('should respond with the requested done todo', function() {
      expect(todo).to.have.length.at.least(1);
    });
  });

  describe('POST /api/todo/update', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/todo/update')
        .send({
          title: 'Old Todo',
          content: 'This is old todo'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newTodo = res.body;
          done();
        });
    });

    it('should respond with the updated todo', function() {
      expect(newTodo.title).to.equal('Old Todo');
      expect(newTodo.content).to.equal('This is old todo');
    });
  });

  describe('DELETE /api/todo/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/todo/${newTodo.id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when todo does not exist', function(done) {
      request(app)
        .delete(`/api/todo/${newTodo.id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
