Response2JSON = {

  JSONFY: function(result) {
    var string = JSON.stringify(result);
    return JSON.parse(string);
  }

};

module.exports = Response2JSON;

