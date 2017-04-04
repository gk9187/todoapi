var express = require('express');
var controller = require('./todo.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/:id', controller.show);
router.get('/list/done', controller.list_done);
router.get('/list/active', controller.list_active);
router.put('/:id/done', controller.done);
router.post('/', controller.add);
router.post('/update', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
