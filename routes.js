/**
 * Main application routes
 */

module.exports = {
  default: function(app) {
    // todoのルーティング
    app.use('/api/todo', require('./api/todo'));
  }
}
