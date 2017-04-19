var util = require("util.js");
import { http } from 'http.js'

function getComments(option) {
  http.get({
    url: 'mysql/commentget.php',
    success: function (res) {
      var comments = res;
      for (var i in comments) {
        comments[i].created = util.formatTime(comments[i].created);
        comments[i].texts = comments[i].texts.split("\n");
        comments[i].photos = comments[i].photos.split(",");
      }
      if (option && option.success) {
        option.success(comments);
      }
    }
  });
}

module.exports = {
  getComments: getComments
}