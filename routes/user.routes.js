var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

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

router.get('/users/login', async(req, res, next) => {
    const user = req.query;
    const pool = await poolPromise;
    const res2 = await pool.request()
    .input('username', sql.VarChar(20), user.username)
    .query('SELECT * FROM [dbo].[GetUserByUsername] (@username)')
    
    if (res2.recordset.length > 0) {
        const hashpassword = res2.recordset[0].PasswordHash;
        delete res2.recordset[0].PasswordHash;
        bcrypt.compare(user.password, hashpassword, function(err, result) {
            if (result == true) {
                res.end(JSON.stringify({ success: true, user: res2.recordset }));
            } else {
                res.end(JSON.stringify({ success: false, result: 'Bad login' }))
            }
        })
    } else {
        res.end(JSON.stringify({ success: false, result: 'Empty' }));
    }
})

router.post('/users/signup/coach', async(req, res, next) => {
    const user = req.body.user;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    const pool = await poolPromise;

    const result = await pool.request()
                    .input('fname', sql.VarChar(20), user.fname)
                    .input('lname', sql.VarChar(20), user.lname)
                    .input('username', sql.VarChar(20), user.username)
                    .input('passhash', sql.VarChar(50), hash)
                    .input('role', sql.Char(1), user.role)
                    .execute('createCoach');

    if (result.returnValue == 0) {
        const res2 = await pool.request()
                    .input('username', sql.VarChar(20), user.username)
                    .query('SELECT * FROM [dbo].[GetUserByUsername] (@username)')
        if (res2.recordset.length > 0) {
            res.end(JSON.stringify({ success: true, result: result.recordset, user: res2.recordset }))
        } else {
            res.end(JSON.stringify({ success: false, result: "Empty" }))
        }
    } else {
        res.end(JSON.stringify({ success: false, message: "Empty" }));
    }
})

router.post('/users/signup/player', async(req, res, next) => {
    const user = req.body.user;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    const pool = await poolPromise;
    const tid = await pool.request()
                    .input('TeamName', sql.VarChar(30), user.teamname)
                    .input('CoachUsername', sql.VarChar(20), user.coachusername)
                    .execute('getTeamFromCoachAndTeamName');
    pool.close();

    if (tid.returnValue > 0) {
        const res2 = await pool.request()
                    .input('username', sql.VarChar(20), user.username)
                    .input('FName', sql.VarChar(20), user.fname)
                    .input('schoolYear', sql.Int, user.schoolyr)
                    .input('TID', sql.Int, tid)
                    .input('number', sql.Int, user.number)
                    .input('LName', sql.VarChar(20), user.lname)
                    .input('PassSalt', sql.VarChar(50), hash)
                    .execte('insertPlayer');

        
        if (res2.recordset.length > 0) {
            res.end(JSON.stringify({ success: true, result: result.recordset, user: res2.recordset }));
        } else {
            res.end(JSON.stringify({ success: false, result: "Empty", ErrorCode: res2.returnValue }));
        }
    } else {
        res.end(JSON.stringify({ success: false, message: "Empty",  ErrorCode: res2.returnValue }));
    }
})

module.exports = router;