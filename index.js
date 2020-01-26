const PORT = 3000;

const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();

// will replace with fake user from sriram
const config = {
    user: 'replace',
    password: 'replace',
    server: 'localhost',
    database: 'crudLAX20'
};

// API ROUTES
// example route
/*

    app.get('/api/descriptive-name-of-crud-op/', (req, res) => {
    var conn = new sql.ConnectionError(config);
    conn.connect()
        .then(() => {
            var req = new sql.Request(conn);
            req.query('SQL QUERY GOES HERE')
                .then((recordSet) => {
                    const response = {
                        success: true,
                        data: recordSet
                    }
                })
                return res.send(response);
        }).catch((err) => {
            console.log(err);
        });
    })

*/


// OPEN PORT
app.listen(port, '0.0.0.0', (err) => {
    if (err) {
        console.log(err);
    }
    console.info('>>> Open http://0.0.0.0:%s/ in your browser.', PORT);
})

module.exports = app;