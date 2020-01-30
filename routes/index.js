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

router.post('/users/sign-up', async(req, res, next) => {
    if (req.body.role == 'Player') {            
        console.log('is a player');
        console.log(req.body.user);
    }
    else {
        const user = req.body.user;
        const pool = await poolPromise;
        const result = await pool.request()
                        .input('fname', sql.VarChar(20), user.fname)
                        .input('lname', sql.VarChar(20), user.lname)
                        .input('username', sql.VarChar(20), user.username)
                        .execute('createCoach');
        console.log(result);
        if (result.returnValue == 0) {
            res.end(JSON.stringify({ success: true, result: result.recordset, user: user }))
        } else {
            res.end(JSON.stringify({ success: false, message: "Empty" }));
        }
    }
})

module.exports = router;