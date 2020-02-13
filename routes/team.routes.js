var express = require('express')
var router = express.Router();

const { poolPromise, sql } = require('../db')

// router.post('/team/update', async(req, res, next) => {
//     const pool = await poolPromise;
//     const result = await pool.request()
//                         .input()
// });

router.get('/team/full-roster', async(req, res, next) => {
    const pool = await poolPromise;
    const res2 = await pool.request()
                            .input('TID', sql.Int, req.query.tid)
                            .query('SELECT * FROM [dbo].[GetFullTeamListByTeamID] (@TID)')
    if (res2.recordset.length >= 0) {
        res.end(JSON.stringify({ success: true, players: res2.recordset }))
    } else {
        res.end(JSON.stringify({ success: false, message: 'Invalid TeamID'}))
    }
})

router.post('/team/full-roster/add', async(req, res, next) => {
    const player = req.body.player;
    const pool = await poolPromise;
    const res2 = await pool.request()
                            .input('username', sql.VarChar(30), player.puname)
                            .query('SELECT * FROM [dbo].[GetUserByUsername] (@username)')
                            console.log('res2', res2)

    if (res2.recordset.length > 0) {
        const res3 = await pool.request()
                                .input('pid', sql.VarChar, res2.recordset[0].ID)
                                .input('tid', sql.Int, player.tid)
                                .execute('AddPlayerToTeam')
        console.log('res3', res3)
        if (res3.returnValue == 0) {
            res.end(JSON.stringify({ success: true }))
        } else {
            res.end(JSON.stringify({ success: false, ErrorCode: res3.returnValue }))
        }
    } else {
        res.end(JSON.stringify({ success: false, message: 'User Not Found'}))
    }
})

/**
 * 
 * req.body:
 *  EMPTY
 * req.query:
 *  username
 * 
 * DB Call:
 *  Using GetUserByUsername func and GetTeamsByCoachID
 * 
 * RETURNS
 *  user and teams coached by user if successful
 *  ERROR:
 *      User Not Found
 *      No Teams Assoc w/ Coach
 */ //


router.get('/teams', async(req, res, next) => {
    const pool = await poolPromise;
    const res2 = await pool.request()
    .input('username', sql.VarChar(20), req.query.username)
    .query('SELECT * FROM [dbo].[GetUserByUsername] (@username)')

    if (res2.recordset.length > 0) {
        const res3 = await pool.request()
        .input('coachID', sql.Int, res2.recordset[0].ID)
        .query('SELECT * FROM [dbo].[GetTeamsByCoachID] (@coachID)')

        if (res3.recordset.length >= 0) {
            res.end(JSON.stringify({ success: true, user: res2.recordset, teams: res3.recordset }))
        } else {
            res.end(JSON.stringify({ success: false, message: "No Teams Associated With Coach" }))
        }
    } 
    else {
        res.end(JSON.stringify({ success: false, message: "User Not Found" }));
    }
})

/**
 * 
 * req.body:
 *  EMPTY
 * req.query:
 *  tid
 * 
 * DB Call:
 *  Using SPROC deleteTeam
 * 
 * RETURNS
 *  0 if successful
 *  -1 if invalid teamID
 */

router.delete('/team', async(req, res, next) => {
    const pool = await poolPromise;
    const res2 = await pool.request()
                    .input('tid', sql.Int, req.query.tid)
                    .execute('deleteTeam')
    if (res2.returnVal == 0) {
        res.end(JSON.stringify({ success: true }))
    } else {
        res.end(JSON.stringify({ success: false, ErrorCode: res2.returnVal }))
    }
})

/**
 * 
 * req.body:
 *  TeamName
 *  CoachID
 *  Hometown
 *  SchoolName
 *  State
 *  isActive ie can players join team
 * req.query:
 *  EMPTY
 * 
 * DB Call:
 *  Using SPROC createTeam
 * 
 * RETURNS
 *   0 if successful
 *   -1 if coach doesn't exist
 *   -2 if team exsists
 *   -3 if coach already on team
 *   -4 if coach doesn't exist
 * 
 */
router.post('/teams/add', async(req, res, next) => {
    const pool = await poolPromise;
    const res2 = await pool.request()
                .input('team_name', sql.VarChar(30), req.body.teamname)
                .input('isActive', sql.Bit, req.body.isActive)
                .input('coach_id', sql.Int, req.body.coachid)
                .input('hometown', sql.VarChar(40), req.body.hometown)
                .input('schoolname', sql.VarChar(40), req.body.schoolname)
                .input('state', sql.Char(2), req.body.state)
                .execute('createTeam');
    console.log(res2);
    if (res2.returnValue == 0) {
        res.end(JSON.stringify({ success: true, user: req.body.coachid}))
        } 
        else {
            res.end(JSON.stringify({ success: false, ErrorCode:res2.returnValue }));
        }
})

module.exports = router;