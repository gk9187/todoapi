var todoSchema = require('../../config/schema');
var dynamoose = require('dynamoose');
var randomstring = require('randomstring');

var todo = dynamoose.model('todo', todoSchema);

module.exports = {
  add: function(title, content) {
    // TODO: キーが被った時のリトライ処理
    var data = new todo({
      id: randomstring.generate(64),
      title: title,
      content: content,
      state: false,
    });
    return data.save();
  },
  destroy: function(key) {
    // keyが存在するかどうかはコントローラ側でみてるので特に気にしない
    return todo.delete({id: key});
  },
  update: function(key, title, content) {
    //  TODO: 両方存在しなかった場合のバリデーション
    //  title, contentいずれかが存在しなかった場合は更新しない
    var data = {};
    if(title !== "") {
      data.title = title;
    }
    if(content !== "") {
      data.content = content;
    }
    // 更新したら未完了にする
    data.state = false;
    return todo.update({id: key}, data);
  },
  get_data: function(id) {
    return todo.query('id').eq(id).exec();
  },
  search: function(q) {
    // TODO: 内容からのみ検索している
    // タイトルも含めor条件で検索するようにする
    if(q === undefined || q === "") {
      throw 'query is required';
    }
    return todo.scan('content').contains(q).exec();
  },
  all: function() {
    return todo.scan().exec();
  },
  done: function(key) {
    return todo.update({id: key}, {state: true});
  },
  list: function(state) {
    return todo.scan('state').eq(state).exec();
  },

};
