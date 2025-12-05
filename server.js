const express = require('express');
var app = express();

express.static.mime.define({'application/wasm': ['wasm']});
app.use(express.static(__dirname + '/dist'));
app.listen(8080, function () {
  console.log('Listening on port 8080...');
});
