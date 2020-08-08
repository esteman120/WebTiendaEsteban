const express = require('express');

const app = express();

app.use(express.static('./dist/app-tienda'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/app-tienda/'}),
);

app.listen(process.env.PORT || 8080);