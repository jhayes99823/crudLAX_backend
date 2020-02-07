var express = require('express')
var router = express.Router();

const { poolPromise, sql } =require('../db')

router.post('/team/create-team', async(req, res, next) => {
    const team = req.body.team;
    const pool = await poolPromise;
    const result = await pool.request()
                    .input('team_name', sql.VarChar(30), team.team_name)
                    .input('isActive', sql.Bit, team.isActive)
                    .input('coach_id', sql.Int, team.coach_id)
                    .input('hometown', sql.VarChar(40), team.hometown)
                    .input('schoolname', sql.VarChar(40), team.schoolname)
                    .input('state', sql.Char(2), team.state)
                    .execute('createTeam');
});

// router.post('/team/update', async(req, res, next) => {
//     const pool = await poolPromise;
//     const result = await pool.request()
//                         .input()
// });

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
            res.end(JSON.stringify({ success: false, message: "Empty" }))

        }
    } 
    else {
        res.end(JSON.stringify({ success: false, message: "Empty" }));
    }
})

router.delete('/teams', async(req, res, next) => {
    const pool = await poolPromise;
    const res2 = await pool.request()
                    .input('tid', sql.Int, req.query.tid)
                    .execute('deleteTeam')
    if (res2.returnVal > 0) {
        res.end(JSON.stringify({ success: true }))
    } else {
        res.end(JSON.stringify({ success: false, ErrorCode: res2.returnVal}))
    }
})

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
    if (res2.returnValue >= 0) {
        res.end(JSON.stringify({ success: true, user: req.body.coachid}))
        } 
        else {
            res.end(JSON.stringify({ success: false, message: "Empty" }));
        }
})

module.exports = router;