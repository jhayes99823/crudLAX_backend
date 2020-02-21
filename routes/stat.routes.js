var express = require('express')
var router = express.Router();

const { poolPromise, sql } =require('../db')

    router.post('/stat/create', async(req, res, next) => {
        // const stat = req.body.stat;
        const pool = await poolPromise;
        console.log('parms', req.query);
        const result = await pool.request()
            .input('forcedTurnover', sql.Int, req.body.forcedTurnover)
            .input('goals', sql.Int, req.body.goals)
            .input('faceoffSuccess', sql.Decimal(5,2), req.body.faceOffSuccess)
            .input('totalFaceoff', sql.Decimal(5,2), req.body.totalFaceoff)
            .input('assists', sql.Int, req.body.assists)
            .input('passSuccess', sql.Decimal(5,2), req.body.passSuccess)
            .input('totalPass', sql.Decimal(5,2), req.body.totalPass)
            .input('groundBall', sql.Int, req.body.groundBall)
            .input('saves', sql.Int, req.body.saves)
            .input('PID', sql.Int, req.body.PID)
            .input('GID', sql.Int, req.body.GameID)
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
                .input('forcedTurnover', sql.Int, req.body.forcedTurnover)
                .input('goals', sql.Int, req.body.goals)
                .input('faceoffSuccess', sql.Decimal(5,2), req.body.faceOffSuccess)
                .input('totalFaceoff', sql.Decimal(5,2), req.body.totalFaceoff)
                .input('assists', sql.Int, req.body.assists)
                .input('passSuccess', sql.Decimal(5,2), req.body.passSuccess)
                .input('totalPass', sql.Decimal(5,2), req.body.totalPass)
                .input('groundBall', sql.Int, req.body.groundBall)
                .input('saves', sql.Int, req.body.saves)
                .input('PID', sql.Int, req.body.PID)
                .input('GID', sql.Int, req.body.GameID)
                .execute('updateStatForPlayer')
        console.log(result);
        if (result.returnValue == 0) {
        res.end(JSON.stringify({ success: true, stats: result.recordset }))
        } else {
        res.end(JSON.stringify({ success: false, ErrorCode: result.returnValue }))
        }

    })

    router.get('/stat/viewstat', async(req, res, next) => {
        const pool = await poolPromise;    
        console.log(req.query);
        const result = await pool.request()
                .input('PID', sql.Int, req.query.PID)
                .query('SELECT * FROM [dbo].[fn_getStatsByPID] (@PID)')
        if (result.recordset.length >= 0) {
            res.end(JSON.stringify({ success: true, stats: result.recordset }))
        } else {
            res.end(JSON.stringify({ success: false, ErrorCode: result.returnValue }))
        }
    })

    router.get('/stat/viewTeamStatByGame', async(req, res, next) => {
        const pool = await poolPromise;    
        console.log(req.query);
        const result = await pool.request()
                .input('TID', sql.Int, req.query.TID)
                .input('GID', sql.Int, req.query.GID)
                .query('SELECT * FROM [dbo].[fn_getStatsByGameAndTeam] (@TID, @GID)')
        if (result.recordset.length >= 0) {
            res.end(JSON.stringify({ success: true, stats: result.recordset }))
        } else {
            res.end(JSON.stringify({ success: false, ErrorCode: result.returnValue }))
        }
    })

    router.get('/stat/viewTeamAverageStats', async(req, res, next) => {
        const pool = await poolPromise;    
        console.log(req.query);
        const result = await pool.request()
                .input('TID', sql.Int, req.query.TID)
                .query('SELECT * FROM [dbo].[fn_getTeamStatsByTID] (@TID)')
        if (result.recordset.length >= 0) {
            res.end(JSON.stringify({ success: true, stats: result.recordset }))
        } else {
            res.end(JSON.stringify({ success: false, ErrorCode: result.returnValue }))
        }
    })

    router.delete('/stat/deleteStatForPlayer', async(req, res, next) => {
        const pool = await poolPromise;    
        console.log(req.query);
        const result = await pool.request()
                .input('PID', sql.Int, req.body.PID)
                .execute('deleteStatForPlayer')
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