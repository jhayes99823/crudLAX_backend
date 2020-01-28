var express = require('express')
var router = express.Router();

const { poolPromise, sql } = require('../db')

router.get('/users', async(req, res, next) => {
    const pool = await poolPromise
    const queryResult = await pool.request()
        .query('SELECT * FROM [UserProfile]')
    if (queryResult.recordset.length > 0) {
        res.end(JSON.stringify({ success: true, result: queryResult.recordset }));
    }
    else {
        res.end(JSON.stringify({ success: false, message: "Empty" }));
    }
})

module.exports = router;