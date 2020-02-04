var express = require('express')
var router = express.Router();

const { poolPromise, sql } =require('../db')

router.post('/activity/create/practice', async(req, res, next) => {
    const activity = req.body.activity;
    const pool = await poolPromise;
    const result = await pool.request()
                    .input('date', sql.Date,activity.date )
                    .input('location', sql.VarChar(30), activity.location)
                    .input('startime', sql.Time, activity.startTime)
                    .input('endtime', sql.Time, activity.endTime)
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

router.post('/activity/create/game', async(req, res, next) => {
    const activity = req.body.activity;
    const pool = await poolPromise;
    const result = await pool.request()
                    .input('date', sql.Date,activity.date )
                    .input('location', sql.VarChar(30), activity.location)
                    .input('startime', sql.Time, activity.startTime)
                    .input('endtime', sql.Time, activity.endTime)
                    .input('win', sql.Bit, activity.win)
                    .input('CoachID', sql.Int, activity.coachID)
                    .input('TeamID', sql.Int, activity.teamID)
                    .input('score', sql.Int, activity.score)
                    .input('oppName', sql.VarChar(30), activity.oppName)
                    .input('oppScore', sql.Int, activity.oppScore)
                    .execute('createGame');
                    if (result.returnVal > 0) {
                        res.end(JSON.stringify({ success: true, activities: result.recordset }))
                    } else {
                        res.end(JSON.stringify({ success: false, ErrorCode: result.returnVal}))
                    }
})

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


module.exports = router;