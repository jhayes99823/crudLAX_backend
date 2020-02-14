var express = require('express')
var router = express.Router();

const { poolPromise, sql } =require('../db')

router.get('/activity', async(req, res, next) => {
    const pool = await poolPromise;
    const result = await pool.request()
                    .input('coachUName', sql.VarChar(30), req.query.username)
                    .query('SELECT * FROM [dbo].[getActivityByCoachUserName] (@coachUName)')

                    if (result.recordset.length > 0) {
                        res.end(JSON.stringify({ success: true, activities: result.recordset }))
                    } else {
                        res.end(JSON.stringify({ success: false, ErrorCOde: result.returnValue }))
                    }
})

//create pracctice 
router.post('/activity/create/practice', async(req, res, next) => {
    const activity = req.body.activity;
    const pool = await poolPromise;
    const result = await pool.request()
                    .input('location', sql.VarChar(30), activity.location)
                    .input('startime', sql.DateTime, activity.startTime)
                    .input('endtime', sql.DateTime, activity.endTime)
                    .input('drill', sql.VarChar(30), activity.drill)
                    .input('CoachID', sql.Int, activity.coachID)
                    .input('TeamID', sql.Int, activity.teamID)
                    .execute('createPractice');
                    if (result.returnVal > 0) {
                        res.end(JSON.stringify({ success: true, activities: result.recordset }))
                    } else {
                        res.end(JSON.stringify({ success: false, ErrorCode: result.returnVal}))
                    }
})

//create game 

router.post('/activity/create/game', async(req, res, next) => {
    const activity = req.body;
    const pool = await poolPromise;
    const result = await pool.request()
                    .input('location', sql.VarChar(30), activity.location)
                    .input('startime', sql.DateTime, activity.starttime)
                    .input('endtime', sql.DateTime, activity.endtime)
                    .input('win', sql.Bit, activity.win)
                    .input('CoachID', sql.Int, activity.coachID)
                    .input('TeamID', sql.Int, activity.teamID)
                    .input('score', sql.Int, activity.score)
                    .input('oppName', sql.VarChar(30), activity.oppName)
                    .input('oppScore', sql.Int, activity.oppScore)
                    .input('name', sql.VarChar(30), activity.name)
                    .execute('createGame');
                    if (result.returnValue == 0) {
                        res.end(JSON.stringify({ success: true, activities: result.recordset }))
                    } else {
                        res.end(JSON.stringify({ success: false, ErrorCode: result.returnValue }))
                    }
})

//delete game 
router.delete('/activity/game', async(req, res, next) => {
    const pool = await poolPromise;
    console.log(req.query);
    const res2 = await pool.request()
                    .input('id', sql.Int, req.query.aid)
                    .input('CoachID', sql.Int, req.query.cid)
                    .input('TeamID', sql.Int, req.query.tid)
                    .execute('deleteGame')
    if (res2.returnVal > 0) {
        res.end(JSON.stringify({ success: true }))
    } else {
        res.end(JSON.stringify({ success: false, ErrorCode: res2.returnVal}))
    }
})

//delete practice 
router.delete('/activity/practice', async(req, res, next) => {
    const pool = await poolPromise;
    console.log(req.query);
    const res2 = await pool.request()
                    .input('id', sql.Int, req.query.aid)
                    .input('CoachID', sql.Int, req.query.cid)
                    .input('TeamID', sql.Int, req.query.tid)
                    .execute('deletePractice')
    if (res2.returnVal > 0) {
        res.end(JSON.stringify({ success: true }))
    } else {
        res.end(JSON.stringify({ success: false, ErrorCode: res2.returnVal}))
    }
})

router.post('/activity/practice', async(req, res, next) => {
    const pool = await poolPromise;
    console.log(req.query);
    const res2 = await pool.request()
                    .input('id', sql.Int, req.query.id)
                    .input('drill', sql.VarChar(30), req.query.drill)
                    .execute('updatePractice')
    if (res2.returnVal > 0) {
        res.end(JSON.stringify({ success: true }))
    } else {
        res.end(JSON.stringify({ success: false, ErrorCode: res2.returnVal}))
    }
})

 
router.post('/activity/practice', async(req, res, next) => {
    const pool = await poolPromise;
    console.log(req.query);
    const res2 = await pool.request()
                    .input('id', sql.Int, req.query.id)
                    .input('date', sql.Date, req.query.date)
                    .input('location', sql.VarChar(30), req.query.location)
                    .input('startTIme', sql.Time, req.query.startTime)
                    .input('endTime'.sql.Time, req.query.endTime)
                    .input('CoachID'.sql.Int, req.query.CoachID)
                    .input('TeamID'.sql.Int, req.query.TeamID)
                    .input('Name', sql.VarChar(30), req.query.name)
                    .execute('updateActivity')
    if (res2.returnVal > 0) {
        res.end(JSON.stringify({ success: true }))
    } else {
        res.end(JSON.stringify({ success: false, ErrorCode: res2.returnVal}))
    }
})


//update game 
//@id int, @win varchar(30) = null, @score int=null, @team1 varchar(30)=null, @oppScore int=null)

router.post('/activity/game', async(req, res, next) => {
    const pool = await poolPromise;
    console.log(req.query);
    const res2 = await pool.request()
                    .input('id', sql.Int, req.query.id)
                    .input('win', sql.VarChar(30), req.query.win)
                    .input('score', sql.Int, req.query.score)
                    .input('team1', sql.VarChar(30), req.query.VarChar(30)
                    .input('oppScore', sql.Int, req.query.oppScore)
                    .execute('updateGame'))
    if (res2.returnVal > 0) {
        res.end(JSON.stringify({ success: true }))
    } else {
        res.end(JSON.stringify({ success: false, ErrorCode: res2.returnVal}))
    }
})

router.get('/activity', async(req, res, next) => {
    const pool = await poolPromise;
    const res2 = await pool.request()
    .input('username', sql.VarChar(20), 'reddy')
    .query('SELECT * FROM [dbo].[getActivityByCoachUserName] (@username)')

    if (res2.recordset.length > 0) {
        res.end(JSON.stringify({ success: true, result: res2.recordset }));

    } 
    else {
        res.end(JSON.stringify({ success: false, ErrorCode: res2.returnValue }));
    }
})


router.get('/activity', async(req, res, next) => {
    const pool = await poolPromise;
    const res2 = await pool.request()
    .input('uname', sql.VarChar(20), req.query.username)
    .query('SELECT * FROM [dbo].[getGameAndPracticeByPlayerUsername] (@uname)')

    if (res2.recordset.length > 0) {
        res.end(JSON.stringify({ success: true, result: res2.recordset }));

    } 
    else {
        res.end(JSON.stringify({ success: false, message: "Empty" }));
    }
})
module.exports = router;