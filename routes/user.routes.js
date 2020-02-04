var express = require('express');
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

router.post('/users/login', async(req, res, next) => {
    const pool = await poolPromise;
    console.log(req.body);
    const result = pool.request()
                        .input('username', sql.VarChar(20), req.body.user.username)
                        .query('SELECT * FROM [dbo].[GetUserByUsername] (@username)');
    console.log(result.recordset);
    if (result.recordset.length > 0) {
        res.end(JSON.stringify({ success: true, result: result.recordset }));
    } else {
        res.end(JSON.stringify({ success: false, result: 'Empty' }));
    }
})

router.post('/users/signup/coach', async(req, res, next) => {
    const user = req.body.user;
    console.log('inside the /signup/coach/ method with user : ', user);
    const pool = await poolPromise;

    const result = await pool.request()
                    .input('fname', sql.VarChar(20), user.fname)
                    .input('lname', sql.VarChar(20), user.lname)
                    .input('username', sql.VarChar(20), user.username)
                    .execute('createCoach');

    console.log(result);
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
    const pool = await poolPromise;
    const tid = await pool.request()
                    .input('TeamName', sql.VarChar(30), user.teamname)
                    .input('CoachUsername', sql.VarChar(20), user.coachusername)
                    .execute('getTeamFromCoachAndTeamName');
    pool.close();
    const hashedObj = util.hashPassword(user.password);

    if (tid.returnValue > 0) {
        const res2 = await pool.request()
                    .input('username', sql.VarChar(20), user.username)
                    .input('FName', sql.VarChar(20), user.fname)
                    .input('schoolYear', sql.Int, user.schoolyr)
                    .input('TID', sql.Int, tid)
                    .input('number', sql.Int, user.number)
                    .input('LName', sql.VarChar(20), user.lname)
                    .input('PassSalt', sql.VarChar(50), hashedObj.salt)
                    .input('PassHash', sql.VarChar(50), hashedObj.hash)
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