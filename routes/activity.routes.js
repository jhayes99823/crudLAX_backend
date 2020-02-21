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
                        res.end(JSON.stringify({ success: false, ErrorCode: result.returnValue }))
                    }
})

router.get('/coach/team/practice', async(req, res, next) => {
    const pool = await poolPromise;
    const result = await pool.request()
                        .input('uname', sql.VarChar(30), req.query.username)
                        .input('tid', sql.Int, req.query.tid)
                        .query('SELECT * FROM [dbo].[GetPracticeByCoachUserNameAndTeamID] (@uname, @tid)')

            if (result.recordset.length > 0) {
                res.end(JSON.stringify({ success: true, practices: result.recordset }))
            } else {
                res.end(JSON.stringify({ success: false, ErrorCode: result.returnValue }))
            }
})

router.get('/coach/team/game', async(req, res, next) => {
    const pool = await poolPromise;
    const result = await pool.request()
                        .input('uname', sql.VarChar(30), req.query.username)
                        .input('tid', sql.Int, req.query.tid)
                        .query('SELECT * FROM [dbo].[GetGameByCoachUserNameAndTeamID] (@uname, @tid)')

            if (result.recordset.length > 0) {
                res.end(JSON.stringify({ success: true, games: result.recordset }))
            } else {
                res.end(JSON.stringify({ success: false, ErrorCode: result.returnValue }))
            }
})


router.get('/activity/player/profileInfo', async(req, res, next) => {
    const pool = await poolPromise;
    const result = await pool.request()
                    .input('uname', sql.VarChar(30), req.query.username)
                    .query('SELECT * FROM [dbo].[getPlayerInformation] (@uname)')
                    if (result.recordset.length > 0) {
                        res.end(JSON.stringify({ success: true, playerProfileInfo: result.recordset }))
                    } else {
                        res.end(JSON.stringify({ success: false, ErrorCode: result.returnValue }))
                    }
})


//get team information by player 
router.get('/activity/team/player/information', async(req, res, next) => {
    const pool = await poolPromise;
    const result = await pool.request()
                    .input('uname', sql.VarChar(30), req.query.username)
                    .query('SELECT * FROM [dbo].[getTeamByPlayerUserName] (@uname)')
                    console.log(result.recordset);
                    if (result.recordset.length > 0) {
                        res.end(JSON.stringify({ success: true, teams: result.recordset }))
                    } else {
                        res.end(JSON.stringify({ success: false, ErrorCOde: result.returnValue }))
                    }
})

//get practice by player 
router.get('/activity/practice/player', async(req, res, next) => {
    const pool = await poolPromise;
    const result = await pool.request()
                    .input('uname', sql.VarChar(30), req.query.username)
                    .query('SELECT * FROM [dbo].[getPracticeByPlayerUserName] (@uname)')
                    if (result.recordset.length > 0) {
                        res.end(JSON.stringify({ success: true, activities: result.recordset }))
                    } else {
                        res.end(JSON.stringify({ success: false, ErrorCOde: result.returnValue }))
                    }
})

//get game by player 
router.get('/activity/game/player', async(req, res, next) => {
    const pool = await poolPromise;
    const result = await pool.request()
                    .input('uname', sql.VarChar(30), req.query.username)
                    .query('SELECT * FROM [dbo].[getGameByPlayerUserName] (@uname)')
                    if (result.recordset.length > 0) {
                        res.end(JSON.stringify({ success: true, activities: result.recordset }))
                    } else {
                        res.end(JSON.stringify({ success: false, ErrorCOde: result.returnValue }))
                    }
})

//update the player profile by executing a stored procedure 
router.post('/activity/player/profile', async(req, res, next) => {
    const pool = await poolPromise;   
    const result = await pool.request()
            .input('uname', sql.VarChar(20), req.body.UserName)
            .input('fname', sql.VarChar(20), req.body.FirstName)
            .input('lname', sql.VarChar(20), req.body.LastName)
            .input('number', sql.Int, req.body.Number)
            .input('position', sql.Char(1),req.body.Position)
            .input('school', sql.Int, req.body.SchoolYear)
            .input('playable', sql.Bit, req.body.Playable)
            .execute('updatePlayerInfo'); 
    if (result.returnValue == 0) {
    res.end(JSON.stringify({ success: true }))
    } else {
    res.end(JSON.stringify({ success: false, ErrorCode: result.returnValue }))
    }

})
    


//create pracctice 
router.post('/activity/create/practice', async(req, res, next) => {
    const activity = req.body;
    const pool = await poolPromise;
    const result = await pool.request()
                    .input('location', sql.VarChar(30), activity.location)
                    .input('startime', sql.DateTime, activity.startTime)
                    .input('endtime', sql.DateTime, activity.endTime)
                    .input('drill', sql.VarChar(30), activity.drills)
                    .input('CoachID', sql.Int, activity.coachID)
                    .input('TeamID', sql.Int, activity.teamID)
                    .input('name', sql.VarChar(30), activity.name)
                    .execute('createPractice');
                    if (result.returnValue == 0) {
                        res.end(JSON.stringify({ success: true, activities: result.recordset }))
                    } else {
                        res.end(JSON.stringify({ success: false, ErrorCode: result.returnValue }))
                    }
})

//create game procedure 

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
  
    const res2 = await pool.request()
                    .input('id', sql.Int, req.query.aid)
                    .input('CoachID', sql.Int, req.query.cid)
                    .input('TeamID', sql.Int, req.query.tid)
                    .execute('deleteGame')
    if (res2.returnValue == 0) {
        res.end(JSON.stringify({ success: true }))
    } else {
        res.end(JSON.stringify({ success: false, ErrorCode: res2.returnValue }))
    }
})

//delete practice 
router.delete('/activity/practice', async(req, res, next) => {
    const pool = await poolPromise;
 
    const res2 = await pool.request()
                    .input('id', sql.Int, req.query.aid)
                    .input('CoachID', sql.Int, req.query.cid)
                    .input('TeamID', sql.Int, req.query.tid)
                    .execute('deletePractice')
    if (res2.returnValue == 0) {
        res.end(JSON.stringify({ success: true }))
    } else {
        res.end(JSON.stringify({ success: false, ErrorCode: res2.returnValue }))
    }
})

router.post('/activity/practice', async(req, res, next) => {
    const pool = await poolPromise;

    const res2 = await pool.request()
                    .input('id', sql.Int, req.body.id)
                    .input('drill', sql.VarChar(30), req.body.drill)
                    .execute('updatePractice')
    if (res2.returnValue == 0) {
        res.end(JSON.stringify({ success: true }))
    } else {
        res.end(JSON.stringify({ success: false, ErrorCode: res2.returnValue }))
    }
})

 
router.post('/activity/practice', async(req, res, next) => {
    const pool = await poolPromise;
 
    const res2 = await pool.request()
                    .input('id', sql.Int, req.body.id)
                    .input('date', sql.Date, req.body.date)
                    .input('location', sql.VarChar(30), req.body.location)
                    .input('startTIme', sql.Time, req.body.startTime)
                    .input('endTime'.sql.Time, req.body.endTime)
                    .input('CoachID'.sql.Int,req.body.CoachID)
                    .input('TeamID'.sql.Int, req.body.TeamID)
                    .input('Name', sql.VarChar(30), req.body.name)
                    .execute('updateActivity')
    if (res2.returnValue == 0) {
        res.end(JSON.stringify({ success: true }))
    } else {
        res.end(JSON.stringify({ success: false, ErrorCode: res2.returnValue }))
    }
})


//update game 
//@id int, @win varchar(30) = null, @score int=null, @team1 varchar(30)=null, @oppScore int=null)

router.post('/activity/game', async(req, res, next) => {
    const pool = await poolPromise;

    const res2 = await pool.request()
                    .input('id', sql.Int, req.body.id)
                    .input('win', sql.VarChar(30), req.body.win)
                    .input('score', sql.Int, req.body.score)
                    .input('team1', sql.VarChar(30), req.body.VarChar(30))
                    .input('oppScore', sql.Int, req.body.oppScore)
                    .execute('updateGame')
                    
    if (res2.returnValue == 0) {
        res.end(JSON.stringify({ success: true }))
    } else {
        res.end(JSON.stringify({ success: false, ErrorCode: res2.returnValue }))
    }
})


module.exports = router;