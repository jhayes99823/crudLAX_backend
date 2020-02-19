var express = require('express')
var router = express.Router();

const { poolPromise, sql } =require('../db')

router.post('/stat/create', async(req, res, next) => {
    // const stat = req.body.stat;
    const pool = await poolPromise;
    console.log('parms', req.query);
    const result = await pool.request()
        .input('PID', sql.Int, req.query.PID)
        .input('GID', sql.Int, req.query.GID)
        .execute('insertStatForPlayerGame')

        console.log(result);
        if (result.returnValue > 0) {
            res.end(JSON.stringify({ success: true, stats: result.recordset }))
        } else {
            res.end(JSON.stringify({ success: false, ErrorCode: result.returnValue }))
        }
    
    })

    router.post('/stat/update', async(req, res, next) => {
        const pool = await poolPromise;    
        console.log(req.query);
        const result = await pool.request()
                .input('forcedTurnover', sql.Int, req.query.forcedTurnover)
                .input('goals', sql.Int, req.query.goals)
                .input('faceoffSuccess', sql.Decimal(5,2), req.query.faceOffSuccess)
                .input('totalFaceoff', sql.Decimal(5,2), req.query.totalFaceoff)
                .input('assists', sql.Int, req.query.assists)
                .input('passSuccess', sql.Decimal(5,2), req.query.passSuccess)
                .input('totalPass', sql.Decimal(5,2), req.query.totalPass)
                .input('groundBall', sql.Int, req.query.groundBall)
                .input('saves', sql.Int, req.query.saves)
                .input('PID', sql.Int, req.query.PID)
                .input('GID', sql.Int, req.query.GameID)
                .execute('updateStatForPlayer')
        console.log(result);
        if (result.returnValue == 0) {
        res.end(JSON.stringify({ success: true, stats: result.recordset }))
        } else {
        res.end(JSON.stringify({ success: false, ErrorCode: result.returnValue }))
        }

    })

    router.post('/stat/viewstat', async(req, res, next) => {
        const pool = await poolPromise;    
        console.log(req.query);
        const result = await pool.request()
                .input('PID', sql.Int, req.query.PID)
                .query('SELECT * FROM [dbo].[fn_GetStatsByPID] (@PID)')

        if (result.recordset.length >= 0) {
            res.end(JSON.stringify({ success: true, stats: result.recordset }))
        } else {
            res.end(JSON.stringify({ success: false, ErrorCode: result.returnValue }))
        }
    })
        
    /*
    We need to create a stat for player using game id and player ID
    Then take the values from the user form and update created stat with said values
    */
    

module.exports = router;