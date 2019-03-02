var express = require('express');
var app = express();

app.use(express.static('dist'));
express.static.mime.types.wasm = 'application/wasm';

app.listen(8080, function() {
  console.log('Listening on port 8080...');
});
