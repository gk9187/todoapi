var Todo = require('./todo.model');

// 正常に値を返すとき
function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

// キーが存在し、削除するとき
function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return Todo.destroy(entity[0].id)
        .then(function() {
          // 何も返すものがないのでstatus:204
          res.status(204).end();
        });
    }
  };
}

// 見つからないときの404処理
function handleEntityNotFound(res) {
  return function(entity) {
    if(entity.length === 0) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

// 例外が発生したとき500を返してエラーログに吐いておく
function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.error(err);
    res.status(statusCode).send(err);
  };
}

// 各コントローラーの処理
module.exports = {
  add: function(req, res) {
    Todo.add(req.body.title, req.body.content)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
  },
  show: function(req, res) {
    Todo.get_data(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
  },
  index: function(req, res) {
    Todo.all()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
  },
  update: function(req, res) {
    Todo.update(req.body.id, req.body.title, req.body.content)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
  },
  destroy: function(req, res) {
    Todo.get_data(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
  },
  search: function(req, res) {
    Todo.search(req.query.q)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
  },
  done: function(req, res) {
    Todo.done(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
  },
  list_done: function(req, res) {
    Todo.list(true)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
  },
  list_active: function(req, res) {
    Todo.list(false)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
  }
};

