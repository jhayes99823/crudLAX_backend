var express = require('express')
var router = express.Router();

const { poolPromise, sql } =require('../db')

router.get('/stat/create-stat', async(req, res, next) => {
    // const stat = req.body.stat;
    const pool = await poolPromise;
    console.log('parms', req.query);
    const gameID = await pool.request()
        .input('opponent', sql.VarChar(30), req.query.opponent)
        .input('startTime', sql.DateTime, req.query.startTime)
        .output('GID', sql.int)
        .execute('getGameByFromOpponent')


    // const gameID = await pool.request()
    //                 .input('opponent', sql.VarChar(30), req.query.opponent)
    //                 .input('startTime', sql.DateTime, req.query.startTime)
    //                 .output('GID', sql.Int)
    //                 .query()
    //                 //errorcheck
    //                 console.log(gameID);
    // const PID = await pool.request()
    //                 .input('playerUsername', sql.VarChar(30), req.query.Username)
    //                 .output('PID', sql.int)
    //                 .query('SELECT * from [dbo].[getUserByUsername] (@Username)');
    //                 //errorcheck
    // console.log(PID);
    // const result = await pool.request()
    //                 .input('PID', sql.Int, PID.output.PID)
    //                 .input('GID', sql.Int, gameID.output.GameID)
    //                 .execute('insertStatForPlayerGame')
    //                 //errorcheck
    
    // const insertedStat = await pool.request()
    //                 .input('forcedTurnover', sql.Int, req.query.forcedTurnover)
    //                 .input('goals', sql.Int, req.query.goals)
    //                 .input('faceoffSuccess', sql.Decimal(5,2), req.query.faceOffSuccess)
    //                 .input('totalFaceoff', sql.Decimal(5,2), req.query.totalFaceoff)
    //                 .input('assists', sql.Int, req.query.assists)
    //                 .input('passSuccess', Decimal(5,2), req.query.passSuccess)
    //                 .input('totalPass', sql.Decimal(5,2), req.query.totalPass)
    //                 .input('groundBall', sql.Int, req.query.groundBall)
    //                 .input('saves', sql.Int, req.query.saves)
    //                 .input('PID', sql.Int, PID.output.PID)
    //                 .input('GID', sql.Int, GameID.output.GameID)
    //                 .execute('updateStatForPlayer')
                    //errorcheck

    /*
    We need to create a stat for player using game id and player ID
    Then take the values from the user form and update created stat with said values
    */
    
})

module.exports = router;